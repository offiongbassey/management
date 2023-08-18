import express from "express";
import guest from "./guest";
import auth from "./auth";
import role from "./role";

const router = express.Router();

router.use('/guest', guest);
router.use('/auth', auth);
router.use('/role', role);


module.exports = router;