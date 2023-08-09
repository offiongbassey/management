import express from "express";
import guest from "./guest";
import auth from "./auth";

const router = express.Router();

router.use('/guest', guest);
router.use('/auth', auth);

module.exports = router;