const express = require("express");
const Bookdate = require("../models/bookdate");

const router = express.Router();
router.get("/bookedDates", async (req, res) => {
  let data = Bookdate.find().then((bookeddates) => {
    res.status(200).json({
      bookeddates,
    });
  });
});
router.post("/bookdate", async (req, res) => {
  try {
    // const modifieddate = new Date(date).toString();
    const bookeddate = new Bookdate(req.body);
    // bookeddate.date = modifieddate;
    console.log("Booking date", bookeddate);
    bookeddate.save().then((result) => {
      res.status(200).json({
        result,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/unbookdate/:id", async (req, res) => {
  try {
    let bookeddate = Bookdate.findById(req.params.id);
    if (!bookeddate) {
      res.send("No bookeddate found");
    } else {
      bookeddate = await Bookdate.findByIdAndDelete(req.params.id);
      res.status(200).json({ Success: "Successfully deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
