const {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/event");
const express = require("express");

const router = express.Router();

router.get("/events", getEvents);
router.post("/events/new", createEvent);
router.delete("/events/delete/:id", deleteEvent);
router.put("/events/update/:id", updateEvent);

module.exports = router;
