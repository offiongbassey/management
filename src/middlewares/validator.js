import { body, param, query } from "express-validator";
import { existingEmail, existingPhone, checkAllowedFields, verifyGuest, acceptedPhoneNumber, titleCase, formatPhoneNumber } from "../helpers/validation";

export const guest_validator = [
    body('name')
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body('email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid")
        .custom(existingEmail)
        .normalizeEmail(),
    body('phone')
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isLength({ min: 11, max: 14 })
        .withMessage("Provide a valid Phone Number")
        .custom(acceptedPhoneNumber)
        .custom(existingPhone)
        .trim()
        .customSanitizer(formatPhoneNumber),
    body('gender')
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Gender cannot be empty")
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
        .withMessage("Guest Id must be number")
        .notEmpty()
        .withMessage('Guest Id cannot be empty'),
    body('name')
        .optional()
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body('email')
        .optional()
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid")
        .normalizeEmail(),
    body('phone')
        .optional()
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isLength({ min: 11, max: 14 })
        .withMessage("Phone Number is invalid")
        .trim()
        .customSanitizer(formatPhoneNumber),
    body('gender')
        .optional()
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Gender cannot be empty")
        .isIn(['male', 'female'])
        .withMessage('Gender must be male or female'),
    param()
        .custom(param => checkAllowedFields(param, 'guest_id')),    
    body()
        .custom(verifyGuest)
        .custom(body => checkAllowedFields(body, ['name', 'email', 'phone', 'gender'] ))
  ]
  
  export const delete_guest_validator = [
    param('guest_id')
        .exists()
        .withMessage("Guest Id is required")
        .isInt()
        .withMessage("Guest Id must be number")
        .notEmpty()
        .withMessage('Guest Id cannot be empty'),
    param()
        .custom(param => checkAllowedFields(param, 'guest_id')),    
  ]
  
  
  export const view_guest_validator = [
    param('guest_id')
        .exists()
        .withMessage('Guest Id is required')
        .isInt()
        .withMessage("Guest Id must be number")
        .notEmpty()
        .withMessage("Guest Id cannot be empty"),
    param()
        .custom(param => checkAllowedFields(param, 'guest_id')),    
  ]
  
  export const search_guests_validator = [
    query("gender")
        .optional()
        .isString()
        .withMessage("Gender must be string")
        .notEmpty()
        .withMessage('Gender cannot be empty')
        .isIn(['male', 'female'])
        .withMessage('Gender must be male or female'),
    query("name")
        .optional()
        .isString()
        .withMessage("Name must be string")
        .notEmpty()
        .withMessage("Name cannot be empty"),
    query("email")
        .optional()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Email is not valid"),
    query("phone")
        .optional()
        .isInt()
        .withMessage("Phone must be number")
        .notEmpty()
        .withMessage("Phone Number cannot be empty"),
    query('status')
        .optional()
        .isString()
        .withMessage("Status must be string")
        .notEmpty()
        .withMessage("Status cannot be empty")
        .isIn(['active', 'deleted', 'blocked'])
        .withMessage("Wrong value passed. Allowed values: active, deleted, blocked"),
    query()
        .custom(query => checkAllowedFields(query, ['gender', 'name', 'email', 'phone', 'status']))
  
  ]

export const multiple_guests_validator = [
    body()
        .isArray()
        .withMessage("Guests must be an array"),
    body('*.name')
        .exists()
        .withMessage("Name is required")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .trim()
        .customSanitizer(titleCase),
    body('*.email')
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid")
        .custom(existingEmail)
        .normalizeEmail(),
    body('*.phone')
        .exists()
        .withMessage("Phone Number is required")
        .notEmpty()
        .withMessage("Phone Number cannot be empty")
        .isLength({ min: 11, max: 14 })
        .withMessage("Provide a valid Phone Number")
        .custom(acceptedPhoneNumber)
        .custom(existingPhone)
        .trim()
        .customSanitizer(formatPhoneNumber),
    body('*.gender')
        .exists()
        .withMessage("Gender is required")
        .notEmpty()
        .withMessage("Gender cannot be empty")
        .isIn(['male', 'female'])
        .withMessage('Gender must be male or female'),
    body('*')
    .custom(body => checkAllowedFields(body, ['name', 'email', 'phone', 'gender']))
]

