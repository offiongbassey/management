import express from "express";
import { createAdmin } from "../controllers/auth";
import { validationHandler } from "../helpers/validation";
import { account_creation_validator } from "../middlewares/validator";
const router = express.Router();

router.post('/create-admin', validationHandler(account_creation_validator), createAdmin);

module.exports = router;