import  express  from "express";
import { createGuest, updateGuest } from "../controllers/guest";
import { validationHandler } from "../helpers/validation";
import { guest_update_validator, guest_validator } from "../middlewares/validator";

const router = express.Router();

router.post('/create', validationHandler(guest_validator), createGuest);
router.patch('/update/:guest_id', validationHandler(guest_update_validator), updateGuest);

module.exports = router;