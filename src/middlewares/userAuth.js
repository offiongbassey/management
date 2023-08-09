import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            return responseHandler(res, 400, false, "Not authorized. Login")
        }
        const verification = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Model.User.findOne({ where: { Wid:verification.id, role: 'user' } });
        if(!user){
            return responseHandler(res, 404, false, "Authorization Failed");
        }
        req.user = user;
        next();
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}