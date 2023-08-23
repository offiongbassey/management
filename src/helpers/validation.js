import Model from "../server/models";
import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";
import { Op } from "sequelize";

export const guestValidation = async (body) =>  {
  await existingEmail(body.email, 'Guest');
  await acceptedPhoneNumber(body.phone);
  await existingPhone(body.phone, 'Guest');
}

export const existingEmail = async (email, type, id) => {
  const check_email_existence = await Model[type].findOne({ where: { email } });

  if (check_email_existence) {

    if(!id){
      throw new Error("Email already exist.");
    }else{
      if(check_email_existence.id !== Number(id)){
        throw new Error("Email already exist.");
      }
    }
  }
  return true;
};

export const acceptedPhoneNumber = async (phone) => {
  const phone_type = phone.charAt(0);
  if(phone_type === `+` && phone?.length != 14){
    throw new Error("Wrong phone number type. Tips: +2348000000000");
  } else if(Number(phone_type) === 0 && phone?.length != 11){
    throw new Error("Wrong phone number type. Tips: 08011111111");
  } else if (phone_type !== `+` && phone_type != 0){
    throw new Error("Invalid Phone Number");
  }
  return true;
}

export const formatPhoneNumber = async (phone) => {
  return `0${ phone?.slice(-10) }`;
}

export const verifyGuest = async (body, { req }) => {
  const guest_id = req.params.guest_id;
  const check_guest_existence = await Model.Guest.findOne({ where: { id: guest_id } });
  if(!check_guest_existence){
    throw new Error("Invalid Guest");
  }
  await existingEmail(body.email, 'Guest', guest_id);
  await acceptedPhoneNumber(body.phone);
  await existingPhone(body.phone, 'Guest', guest_id);
}

export const titleCase = async (name) => {
  return name?.toLowerCase()?.split(' ').map(function (text) {
    return (text?.charAt(0).toUpperCase() + text?.slice(1));
  }).join(' ');
}

export const existingPhone = async (phone, type, id) => {
  const check_phone_existence = await Model[type].findOne({ where: { phone } });
    if (check_phone_existence) {

    if(!id){
      throw new Error("Phone Number already exist. Provide another one.");
    }else{
      if(check_phone_existence.id !== Number(id)){
        throw new Error("Phone Number already exist. Provide another one.");
      } 
    }
  }
 
  return true;
};

export const checkAllowedFields = (payload, fields) => {
  payload = Array.isArray(payload) ? payload : [payload];

  payload.forEach((item) => {
    const allowed = Object.keys(item).every(field => fields.includes(field));
    fields = typeof fields === 'string' ? fields : fields.join(', ');

    if(!allowed){
      throw new Error(`Wrong fields passed. Allowed fields: ${ fields }`);
    }
  });
  return true;
}

export const validationHandler = (values = []) => {
  return async (req, res, next) => {
    await Promise.all(values.map((value) => value.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const _errors = errors.array();
    let message = "Invalid Parameters:";

    _errors.forEach((v) => {
      message += `${ v.param },`;
    });
    responseHandler(res, 422, false, { errors: errors.array() });
  };
};

export const accountValidation = async (body) => {
  const verify_username = await Model.User.findOne({ where: { username: body.username } });

  if(verify_username){
    throw new Error("Username already exist");
  }
  if(body.password !== body.confirm_password){
     throw new Error('Passwords do not match');
  }

  await existingEmail(body.email, 'User');
  await existingPhone(body.phone, "User");
  await acceptedPhoneNumber(body.phone);
}

export const verifyRole = async (role_id) => {
  const verify_role = await Model.Role.findOne({ where: { id: role_id, status: { [Op.ne]: 'deleted'} }})
  if(!verify_role){
    throw new Error("Role does not exist.");
  }
  return true;
}