import Model from "../server/models";
import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";


export const existingEmail = async (email, { req }) => {
  const check_email_existence = await Model.Guest.findOne({ where: { email } });
  if (check_email_existence) {
    throw new Error("Email already exist");
  }
  return true;
};

export const updateExistingEmail = async (email, { req }) => {
  const verify_user_existing_email = await Model.Guest.findOne({ where: { email } });
  if(verify_user_existing_email){
    if(verify_user_existing_email.id === Number(req.params.guest_id)){
      return true;
    }else{
      throw new Error("Email already exist.");
    }
  }
  return true;
}

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

export const updateExistingPhone = async (phone,  guest_id) => {
  const verify_user_existing_phone = await Model.Guest.findOne({ where: { phone } });
  if(verify_user_existing_phone){
    if(verify_user_existing_phone.id === Number(guest_id)){
      return true;
    } else {
      throw new Error("Phone Number already exist");
    }
  }
  return true;
}

export const verifyGuest = async (body, { req }) => {
  const guest_id = req.params.guest_id;
  const check_guest_existence = await Model.Guest.findOne({ where: { id: guest_id } });
  if(!check_guest_existence){
    throw new Error("Invalid Guest");
  }
  await updateExistingEmail(body.email, { req });
  await acceptedPhoneNumber(body.phone);
  await updateExistingPhone(body.phone, guest_id);
}

export const titleCase = async (name) => {
  return name?.toLowerCase()?.split(' ').map(function (text) {
    return (text?.charAt(0).toUpperCase() + text?.slice(1));
  }).join(' ');
}

export const existingPhone = async (phone) => {
  const check_phone_existence = await Model.Guest.findOne({ where: { phone } });
  if (check_phone_existence) {
    throw new Error(
      "Phone Number already exist. Please provide another one."
    );
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

