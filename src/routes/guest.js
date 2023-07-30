import  express  from "express";
import { createGuest } from "../controllers/guest";
import { validationHandler } from "../helpers/validationHandler";
import { guest_validator } from "../helpers/guestValidator";

const router = express.Router();

router.post('/create', validationHandler(guest_validator), createGuest);

module.exports = router;