import Model from "../server/models";

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
