const { check, validationResult } = require("express-validator");

const memberValidationRules = () => {
  return [
    check("crewId", "Crew id is required").not().isEmpty(),
    check("id", "Id is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("userId", "User id is required").not().isEmpty(),
  ];
};

const absenceValidationRules = () => {
  return [
    check("crewId", "Crew id is required").not().isEmpty(),
    check("id", "Id is required").not().isEmpty(),

    check("endDate", "End date is required")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
    check("startDate", "Start date is required")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
    check("type", "Absence type is required").not().isEmpty(),
    check("userId", "User id is required").not().isEmpty(),
  ];
};

const validateMember = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });

    return res.status(500).send({ msg: messages });
  }
  next();
};

const validateAbsence = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });

    return res.status(500).send({ msg: messages });
  }
  next();
};

module.exports = {
  memberValidationRules,
  absenceValidationRules,
  validateMember,
  validateAbsence,
};
