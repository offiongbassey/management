import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler";

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
