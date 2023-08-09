import express from "express";
import { createAdmin, createUser, login, logout } from "../controllers/auth";
import { validationHandler } from "../helpers/validation";
import { account_creation_validator, login_validator } from "../middlewares/validator";
const router = express.Router();

router.post('/create-admin', validationHandler(account_creation_validator), createAdmin);
router.post('/create-user', validationHandler(account_creation_validator), createUser);
router.post('/login', validationHandler(login_validator), login);
router.get('/logout', logout);

module.exports = router;