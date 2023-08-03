import  express  from "express";
import { createGuest, deleteGuest, updateGuest } from "../controllers/guest";
import { validationHandler } from "../helpers/validation";
import { delete_guest_validator, guest_update_validator, guest_validator } from "../middlewares/validator";

const router = express.Router();

router.post('/create', validationHandler(guest_validator), createGuest);
router.patch('/update/:guest_id', validationHandler(guest_update_validator), updateGuest);
router.delete('/delete/:guest_id', validationHandler(delete_guest_validator), deleteGuest);


module.exports = router;