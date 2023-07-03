const { userValidator } = require("../validators/validators.js");
const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/auth");

router.post("/users/signin", userValidator, createUser);
router.post("/users/login", login);

module.exports = router;
