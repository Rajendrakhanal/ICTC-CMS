const mongoose = require("mongoose");

const bookdateSchema = new mongoose.Schema({
  date: {
    type: String,
    unique: true,
    required: true,
  },
});

const Bookdate = mongoose.model("Bookdate", bookdateSchema);
module.exports = Bookdate;
