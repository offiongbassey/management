import { body } from "express-validator";
import { existingEmail, existingPhone, checkAllowedFields } from "../helpers/validation";

export const guest_validator = [
    body('name')
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        .withMessage("Please provide your Name")
        .isLength({min: 5, max: 50})
        .withMessage("Name must be within 5 to 50 Characters")
        .trim(),
    body('email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid Email")
        .custom(existingEmail)
        .normalizeEmail(),
    body('phone')
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Please provide your Phone Number")
        .isLength({min: 11})
        .withMessage("Please provide a valid Phone Number")
        .custom(existingPhone)
        .trim(),
    body('gender')
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Please Select your Gender"),
    body()
    .custom(body => checkAllowedFields(body, ['name', 'email', 'phone', 'gender']))
]