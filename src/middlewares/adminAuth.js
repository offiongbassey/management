import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import jwt from "jsonwebtoken";
import { client } from "../helpers/redis_connect";
import { jwtVerification } from "../helpers/jwtVerification";

export const adminAuth = async(req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token){
            return responseHandler(res, 404, false, "Token is required");
        }
        const verification = jwtVerification(token);
        const redis_token = await client.get(`user_${ verification.id.toString() }`, (err, data) => {
            if(err) throw new err;
        })

        if(!redis_token){
            return responseHandler(res, 400, false, "User not logged In");
        }else{
        const user = await Model.User.findOne({ where: { id: verification.id }, include: [
            { model: Model.Role, 
                attributes: [
                    "name"
                ],
                as: 'role'
            }
        ] });
        if(!user){
            return responseHandler(res, 400, false, "Authorization Failed");
        }
        if(user.role.name !== 'admin'){
            return responseHandler(res, 400, false, "User not authorized");
        }
        req.user = user;
        next();
        }
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}