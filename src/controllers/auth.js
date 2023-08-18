import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import bcrypt from "bcryptjs";
import Model from "../server/models";
import { generateToken } from "../helpers/userToken";
import { client } from "../helpers/redis_connect";
import { jwtVerification } from "../helpers/jwtVerification";

export const createUser = async (req, res) => {
    try {
        const { name, username, email, phone, gender, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await Model.User.create({
            name,
            username,
            email,
            phone,
            gender, 
            'status': 'active',
            password: hashedPassword,
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
        const verifyPassword = await bcrypt.compare(password, user.password);
        if(!verifyPassword){
            return responseHandler(res, 400, false, "Invalid Email or Password");
        }
        const token = generateToken(user.id);
        
        await  client.setEx(`user_${ user.id.toString() }`, 120, token);
        
        const { id, name, username, phone, gender, status } = user;
        const user_data = {id, name, username, phone, gender, status, token};
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
