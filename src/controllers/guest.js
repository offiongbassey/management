import Model from "../server/models";
import { responseHandler } from "../helpers/responseHandler";
import { errorHandler } from "../helpers/errorHandler";

export const createGuest = async(req, res) => {
    const description = "Creating of guest";
    const note = "Guest Created";
    try {
        const guest = await Model.Guest.create(req.body);
        await Model.Log.create({
            userId: 1,
            guestId: guest.id,
            description,
            note  
        });
        responseHandler(res, 201, true, "Guest Information successfully saved", guest);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const updateGuest = async(req, res) => {
    const id = req.params.guest_id;
    const { name, email, phone, gender } = req.body;
    const guest = await Model.Guest.findByPk(id);
    if(!guest || guest.status === 'deleted'){
        return responseHandler(res, 404, false, "Guest not found");
    }
    const description = `Updating guest record FROM Name: ${ guest.name } , Email: ${ guest.email }, Phone: ${ guest.phone }, Gender: ${ guest.gender } TO Name: ${ name } , Email: ${ email }, Phone: ${ phone }, Gender: ${ gender }`;
    const note = 'Guest Updated'
    try {
        const updated_guest = await Model.Guest.update(req.body, { where: { id }, returning: true });
        await Model.Log.create({
            userId: 1,
            guestId: id,
            description,
            note
        });
        responseHandler(res, 200, true, "Guest Successfully Updated", updated_guest);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteGuest = async(req, res) => {
    const id = req.params.guest_id;
    const description = "Deleting of guest.";
    const note = "Guest Deleted";

    const guest = await Model.Guest.findByPk(id);
    if(!guest){
        return responseHandler(res, 404, false, "Guest not found");
    }
    if(guest.status === 'deleted'){
        return responseHandler(res, 400, false, "Guest already deleted");
    }

    try {
        await Model.Guest.update({ status: 'deleted' }, { where: {id} });
        await Model.Log.create({
            userId: 1,
            guestId: id,
            description,
            note
        });
        responseHandler(res, 200, true, "Guest Deleted Successfully");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}