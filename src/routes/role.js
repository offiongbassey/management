import express from "express";
import { validationHandler } from "../helpers/validation";
import { assign_role_validator, change_role_status_validator, create_role_validator, delete_role_validator, update_role_validator } from "../middlewares/validator";
import { assignRole, changeRoleStatus, createRole, deleteRole, updateRole } from "../controllers/role";
const router = express.Router();

router.post('/create-role', validationHandler(create_role_validator), createRole);
router.patch('/assign-role/:user_id', validationHandler(assign_role_validator), assignRole);
router.patch('/update-role/:role_id', validationHandler(update_role_validator), updateRole);
router.patch('/change-role-status/:role_id', validationHandler(change_role_status_validator), changeRoleStatus);
router.patch('/delete-role/:role_id', validationHandler(delete_role_validator), deleteRole);

module.exports = router;    