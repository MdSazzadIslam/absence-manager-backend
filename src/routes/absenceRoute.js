"use strict";

const express = require("express");
const router = express.Router();
const {
  getAbsenceAll,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
  deleteAbsenceAll,
} = require("../controllers/absenceController");
const {
  absenceValidationRules,
  validateAbsence,
} = require("../middlewares/validator");

router.get("/", getAbsenceAll);
router.get("/:id", getAbsenceById);
router.post(
  "/create",
  [absenceValidationRules(), validateAbsence],
  createAbsence
);
router.put(
  "/update/:id",
  [absenceValidationRules(), validateAbsence],
  updateAbsence
);
router.delete("/delete/:id", deleteAbsence);
router.delete("/deleteAll", deleteAbsenceAll);
module.exports = router;
