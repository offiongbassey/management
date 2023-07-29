import Model from "../server/models";
import { responseHandler } from "../helpers/responseHandler";
import { errorHandler } from "../helpers/errorHandler";

export const createGuest = async(req, res) => {
    try {
        const newGuest = await Model.Guest.create(req.body);
        responseHandler(res, 201, true, "Guest Information successfully saved", newGuest);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, please try again later");
    }
}