const Service = require("../models/Service");
const { validationResult } = require("express-validator");

exports.getServices = async (req, res) => {
  await Service.find().then((services) => {
    res.status(200).json({
      services,
    });
  });
};

exports.createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, imageUrl } = req.body;
    // if there are errors, return bad request and the errors

    const services = new Service({
      title,
      description,
      imageUrl,
    });
    services.save().then((result) => {
      res.status(200).json({
        result,
        errors,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

exports.deleteService = async (req, res) => {
  try {
    let serv = Service.findById(req.params.id);
    if (!serv) {
      res.send("No service found");
    } else {
      serv = await Service.findByIdAndDelete(req.params.id);
      res.status(200).json({ Success: "Successfully deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateService = async (req, res) => {
  try {
    let service = Service.findById(req.params.id);
    if (!service) {
      res.status(404).send("No srvice");
    } else {
      service = await Service.findByIdAndUpdate(req.params.id);
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
