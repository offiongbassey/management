import  express  from "express";
import { createGuest, deleteGuest, getGuestById, getGuests, updateGuest } from "../controllers/guest";
import { validationHandler } from "../helpers/validation";
import { delete_guest_validator, guest_update_validator, guest_validator, search_guests_validator, view_guest_validator } from "../middlewares/validator";
import { adminAuth, userAuth } from "../middlewares/auth";

const router = express.Router();

router.post('/create', userAuth, validationHandler(guest_validator), createGuest);
router.patch('/update/:guest_id', adminAuth, validationHandler(guest_update_validator), updateGuest);
router.delete('/delete/:guest_id', adminAuth, validationHandler(delete_guest_validator), deleteGuest);
router.get('/view/:guest_id', validationHandler(view_guest_validator), getGuestById);
router.get('/view', validationHandler(search_guests_validator), getGuests);

module.exports = router;