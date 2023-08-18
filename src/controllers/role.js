import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";


export const createRole = async (req, res) => {
    try {
        const existing_role = await Model.Role.findOne({where: {name: req.body.name } });
        if(existing_role){
            return responseHandler(res, 400, false, "Role already exist");
        }
        const role = await Model.Role.create(req.body);

        return responseHandler(res, 201, true, "Role Created Successfully", role);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}


export const assignRole = async (req, res) => {
    try {
        const id = req.params.user_id

        const user = await Model.User.findOne({ where: { id, status: 'active' } });
        if(!user){
            return responseHandler(res, 404, false, "User not found");
        }
        const assigned_user = await Model.User.update(req.body, {
            where: { id }
        });

        return responseHandler(res, 200, true, "Role Successfully Assigned", assigned_user);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}

