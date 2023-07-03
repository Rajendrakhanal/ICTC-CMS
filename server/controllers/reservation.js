const Reservation = require("../models/Reservation");
const { validationResult } = require("express-validator");

exports.getReservations = async (req, res) => {
  await Reservation.find().then((reservations) => {
    res.status(200).json({
      reservations,
    });
  });
};

exports.createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    let reservationData = req.body;
    const formattedDate = new Date(reservationData.date).toLocaleDateString(
      "en-GB",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    reservationData.date = formattedDate;
    console.log("Creating reservation", formattedDate);
    const reservation = new Reservation(reservationData);
    reservation.save().then((result) => {
      res.status(200).json({
        result,
        errors,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    let serv = Reservation.findById(req.params.id);
    if (!serv) {
      res.send("No Reservation found");
    } else {
      serv = await Reservation.findByIdAndDelete(req.params.id);
      res.status(200).json({ Success: "Successfully deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
