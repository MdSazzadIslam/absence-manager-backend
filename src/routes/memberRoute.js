"use strict";

const express = require("express");
const router = express.Router();
const {
  getMemberAll,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  deleteMemberAll,
} = require("../controllers/memberController");
const {
  memberValidationRules,
  validateMember,
} = require("../middlewares/validator");

router.get("/", getMemberAll);
router.get("/:id", getMemberById);
router.post("/create", [memberValidationRules(), validateMember], createMember);
router.put(
  "/update/:id",
  [memberValidationRules(), validateMember],
  updateMember
);
router.delete("/delete/:id", deleteMember);
router.delete("/deleteAll", deleteMemberAll);
module.exports = router;
