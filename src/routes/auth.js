import express from "express";
import { createUser, login, logout } from "../controllers/auth";
import { validationHandler } from "../helpers/validation";
import { account_creation_validator, login_validator, logout_validator } from "../middlewares/validator";
const router = express.Router();

router.post('/create-user', validationHandler(account_creation_validator), createUser);
router.post('/login', validationHandler(login_validator), login);
router.get('/logout', validationHandler(logout_validator), logout);


module.exports = router;    