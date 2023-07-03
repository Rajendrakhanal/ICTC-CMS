const Contact = require("../models/contact");
const { validationResult } = require("express-validator");

exports.getContacts = async (req, res) => {
  Contact.find().then((Contacts) => {
    res.status(200).json({
      Contacts,
    });
  });
};

exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const contact = new Contact(req.body);
    console.log("Creating Contact");
    contact.save().then((result) => {
      res.status(200).json({
        result,
        errors,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    let contact = Contact.findById(req.params.id);
    if (!contact) {
      res.send("No Contact found");
    } else {
      contact = await Contact.findByIdAndDelete(req.params.id);
      res.status(200).json({ Success: "Successfully deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
