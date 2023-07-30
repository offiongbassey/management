import express from "express";
import guest from "./guest";

const router = express.Router();

router.use('/guest', guest);

module.exports = router;