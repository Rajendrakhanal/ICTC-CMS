const { check } = require("express-validator");

exports.serviceValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Title must be longer than 3"),
  check("description")
    .isLength({ min: 20 })
    .withMessage("Description must be longer than 20 letters"),
];

exports.userValidator = [
  check("name").isLength({ min: 3, max: 20 }),
  check("email").isEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 letters or more"),
];
exports.contactValidator = [
  check("email").isEmail().withMessage("Invalid email"),
  check("message").notEmpty().withMessage("Message field must not be empty"),
  check("name").notEmpty().withMessage("Name field must not be empty"),
];
exports.reservationValidator = [
  check("email").isEmail().withMessage("Must be valid email"),
  check("name").notEmpty().withMessage("Name field must not be empty"),
  check("date").notEmpty().withMessage("Date field must not be empty"),
  check("message").notEmpty().withMessage("Message field must not be empty"),
];
