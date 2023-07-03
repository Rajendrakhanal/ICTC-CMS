const {
  createCred,
  getCredential,
  verifyCred,
} = require("../controllers/credential");
const express = require("express");

const router = express.Router();
router.get("/credentials", getCredential);
router.post("/credentials/new", createCred);
router.post("/credentials/verify", verifyCred);

module.exports = router;
