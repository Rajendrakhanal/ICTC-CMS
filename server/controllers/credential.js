const Credential = require("../models/Credential");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "rajuisagoodb@oy";

exports.createCred = async (req, res) => {
  try {
    //catch a error

    //Create a new credential
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    credential = await Credential.create({
      username: req.body.username,
      password: secPass,
    });
    const data = {
      credential: {
        id: credential.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

exports.getCredential = async (req, res) => {
  try {
    await Credential.find().then((credentials) => {
      res.status(200).json({
        credentials,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

exports.verifyCred = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Credential.findOne({ username });
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
    res.status(500).send(error);
  }
};
