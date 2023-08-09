import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import bcrypt from "bcryptjs";

import Model from "../server/models";

export const createAdmin = async(req, res) => {
    try {
        const { name, username, email, phone, gender, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const account = await Model.User.create({
            name,
            username,
            email,
            phone,
            gender, 
            role: 'admin',
            'status': 'active',
            password: hashedPassword,
        });
        delete account['password'];

        return responseHandler(res, 201, true, "Account Successfully Created.", account);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}