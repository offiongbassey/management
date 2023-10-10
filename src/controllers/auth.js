import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import bcrypt from "bcryptjs";
import Model from "../server/models";
import { generateToken } from "../helpers/jwtVerification";
import { client } from "../server/config/redis";
import { jwtVerification } from "../helpers/jwtVerification";
import { generateUsername } from "../helpers/generateUsername";

export const createUser = async (req, res) => {
    try {
        const { name, username, email, phone, gender, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt); 
        //generating unique username
        const user_name = username ? username : await generateUsername(name);
       
        const user = await Model.User.create({
            name,
            username: user_name,
            email,
            phone,
            gender, 
            'status': 'active',
            password: hashed_password
        });

        return responseHandler(res, 201, true, "Account Successfully Created.", user);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Model.User.findOne({ where: { email, status: 'active' } });
        if(!user){
            return responseHandler(res, 404, false, "User not found");
        }
        const verify_password = await bcrypt.compare(password, user.password);
        if(!verify_password){
            return responseHandler(res, 400, false, "Invalid Email or Password");
        }
        const token = generateToken(user.id);
        
        await  client.setEx(`user_${ user.id.toString() }`, 60000, token);
        
        const { id, name, username, phone, gender, status } = user;
        const user_data = { id, name, username, phone, gender, status, token };
        return responseHandler(res, 200, true, "Account Successfully Logged In", user_data);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const logout = async (req, res) => {
    try {
        
        const token = req.headers.token;
        const verification = jwtVerification(token);
        const redis_token = await client.get(`user_${ verification.id.toString() }`);

        if(redis_token){
        await client.DEL(`user_${ verification.id.toString() }`);
        }

        return responseHandler(res, 200, true, "Account successfully Logged Out");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}