const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
const JWT_SECRET = "rajuisagoodb@oy";

// ROUTE 1: create a user using: POST "/api/auth/createUser". No login Required
exports.createUser = async (req, res) => {
  //check whether the user with the same email exist already
  try {
    //catch a error
  const {name, password } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }
  if (name.length<3 || name.length>20){
    return res.status(400).json({ message: "Name must be at least 3 characters long" });
  }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }
    //Create a new User
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,      
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    success=true;
    res.json({success, authToken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

//ROUTER 2: Authenticate a user using: POST "/api/auth/login". No login Required
exports.login = async (req, res) => {
  //if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};
