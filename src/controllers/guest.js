import Model from "../server/models";
import { responseHandler } from "../helpers/responseHandler";
import { errorHandler } from "../helpers/errorHandler";


const Op = Model.Sequelize.Op;

export const createGuest = async (req, res) => {
  try {
    const guest = await Model.Guest.create(req.body);
    await Model.Log.create({
      guest_id: guest.id,
      description: "created",
      note: "Guest Created",
      payload: req.body,
    });
    return responseHandler(res, 201, true, "Guest Information successfully saved", guest);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const updateGuest = async (req, res) => {
  try {
    const id = req.params.guest_id;
    const guest = await Model.Guest.findOne({ where: { id, status: { [Op.ne]: 'deleted' } } });
    if (!guest) {
      return responseHandler(res, 404, false, "Guest not found");
    }

    const updated_guest = await Model.Guest.update(req.body, {
      where: { id },
      returning: true,
    });
    await Model.Log.create({
      guest_id: id,
      description: "edited",
      note: "Guest Updated",
      payload: req.body,
    });
    return responseHandler(res, 200, true, "Guest Successfully Updated", updated_guest);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const deleteGuest = async (req, res) => {
  try {
    const id = req.params.guest_id;
    const guest = await Model.Guest.findOne({ where: {id, status: { [Op.ne]: 'deleted' } } });
    if (!guest) {
      return responseHandler(res, 404, false, "Guest not found");
    }
  

    await Model.Guest.update({ status: "deleted" }, { where: { id } });
    await Model.Log.create({
      guest_id: id,
      description: "deleted",
      note: "Guest Deleted",
      payload: guest,
    });
    return responseHandler(res, 200, true, "Guest Deleted Successfully");
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};


export const getGuestById = async (req, res) => {
    try {
      const guest = await Model.Guest.findOne({ where: { id:req.params.guest_id, status: { [Op.ne]: 'deleted' } } } );
      if (!guest) {
        return responseHandler(res, 404, false, "Guest not found");
      }
  
      return responseHandler(res, 200, true, "Guest retrived", guest);
    } catch (error) {
      await errorHandler(error);
      return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
  };
  
  export const getGuests = async (req, res) => {
    try {
      const { query: { gender, name, email, phone, status }} = req;
      const where = {}
      if(gender){
        where.gender = gender;
      }
      if(name){
        where.name = { [Op.iLike]: `%${ name }%` };
      }
      if(email){
        where.email = email;
      }
      if(phone){
        where.phone = phone;
      }
      if(status){
        where.status = status;
      }
      
      const guests = await Model.Guest.findAll({ where });
      if (guests?.length < 1) {
        return responseHandler(res, 404, false, "Guest not found");
      }
      
      return responseHandler(res, 200, true, "Guests retrived", guests);
    } catch (error) {
      await errorHandler(error);
      return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
  };


  
  export const createMultipleGuests = async(req, res) => {
    try {
      
      for(let count = 0; count < req.body.length; count++){
        const guest = req.body[count];
        await Model.Guest.create(guest);
      }

    return responseHandler(res, 201, true, "Guests Information successfully saved.");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
  }
