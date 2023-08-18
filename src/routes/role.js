import express from "express";
import { validationHandler } from "../helpers/validation";
import { assign_role_validator, create_role_validator } from "../middlewares/validator";
import { assignRole, createRole } from "../controllers/role";
const router = express.Router();

router.post('/create-role', validationHandler(create_role_validator), createRole);
router.patch('/assign-role/:user_id', validationHandler(assign_role_validator), assignRole);

module.exports = router;    