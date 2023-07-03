const { createContact, getContacts } = require("../controllers/contact");
const express = require("express");
const { contactValidator } = require("../validators/validators");
const { deleteContact } = require("../controllers/contact");

const router = express.Router();
router.get("/contacts", getContacts);
router.post("/contacts/new", contactValidator, createContact);
router.delete("/contacts/delete/:id", deleteContact);

module.exports = router;
