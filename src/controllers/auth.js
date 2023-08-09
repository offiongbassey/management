import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Model from "../server/models";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export const createAdmin = async(req, res) => {
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
            role: 'admin',
            'status': 'active',
            password: hashedPassword,
        });

        return responseHandler(res, 201, true, "Account Successfully Created.", user);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}


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
            role: 'user',
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
        const userToken = generateToken(user.id);
        res.cookie("token", userToken, {
            path: "/",
            sameSite: "none",
            secure: false,
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400)
        });
        return responseHandler(res, 200, true, "Account Successfully Logged In", user);

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            path: "/",
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: new Date(0)
        });
        return responseHandler(res, 200, true, "Account successfully Logged Out");

    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}