const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  participants: {
    type: Number,
  },
  instructors: {
    type: Number,
  },
  organizer: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  date:{
    type:Date,
    default:Date.now
}

});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
