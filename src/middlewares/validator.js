import { body, param } from "express-validator";
import { existingEmail, existingPhone, checkAllowedFields, verifyGuest, acceptedPhoneNumber, titleCase, formatPhoneNumber } from "../helpers/validation";

export const guest_validator = [
    body('name')
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        .withMessage("Please provide your Name")
        .trim()
        .customSanitizer(titleCase),
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
        .isLength({ min: 11, max: 14 })
        .withMessage("Please provide a valid Phone Number")
        .custom(acceptedPhoneNumber)
        .custom(existingPhone)
        .trim()
        .customSanitizer(formatPhoneNumber),
    body('gender')
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Please Select your Gender")
        .isIn(['male', 'female'])
        .withMessage('Gender must be male or female'),
    body()
    .custom(body => checkAllowedFields(body, ['name', 'email', 'phone', 'gender']))
]

export const guest_update_validator = [
    param('guest_id')
        .exists()
        .withMessage("Guest Id is required")
        .isInt()
        .withMessage("Guest Id is a number")
        .notEmpty()
        .withMessage('Guest Id cannot be empty'),
    body('name')
        .optional()
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        .withMessage("Please provide your Name")
        .isLength({ min: 5, max: 50 })
        .withMessage("Name must be within 5 to 50 Characters")
        .trim()
        .customSanitizer(titleCase),
    body('email')
        .optional()
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid Email")
        .normalizeEmail(),
    body('phone')
        .optional()
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Please provide your Phone Number")
        .isLength({ min: 11 })
        .withMessage("Please provide a valid Phone Number")
        .trim()
        .customSanitizer(formatPhoneNumber),
    body('gender')
        .optional()
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Please Select your Gender")
        .isIn(['male', 'female'])
        .withMessage('Gender must be male or female'),
    param()
        .custom(param => checkAllowedFields(param, 'guest_id')),    
    body()
        .custom(verifyGuest)
        .custom(body => checkAllowedFields(body, ['name', 'email', 'phone', 'gender'] ))
    
]