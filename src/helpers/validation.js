import Model from "../server/models";
import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";


export const existingEmail = async (email, { req }) => {
  const check_email_existence = await Model.Guest.findOne({ where: { email } });
  if (check_email_existence) {
    throw new Error("Sorry, email already exist");
  }
  return true;
};

export const existingPhone = async (phone) => {
  const check_phone_existence = await Model.Guest.findOne({ where: { phone } });
  if (check_phone_existence) {
    throw new Error(
      "Sorry, Phone Number already exist. Please provide another one."
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
