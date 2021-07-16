"use strict";

const express = require("express");
const memberRoute = require("./memberRoute");
const absenceRoute = require("./absenceRoute");

const router = express.Router();
router.use("/api/v1/member", memberRoute);
router.use("/api/v1/absence", absenceRoute);

module.exports = router;
