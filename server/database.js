/**
 * Importing the packages
 */
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

const Event = require("./models/Event");

// Loading the environmental variable
dotenv.config();

// Connecting to the database
mongoose.connect(process.env.MONGO_DB).then(() => {
  console.log("Successfully connected to MongoDB...");
});

// Reading the event data from the event.json file
const event_data = JSON.parse(fs.readFileSync("./events.json", "utf8"));

event_data.forEach((event) => {
  /**
   * [createEvent description]
   * @param {Object} event [Python dictionary object]
   * @returns {[void]}
   */
  const createEvent = async (event) => {
    /**
     * Ahele orginal image navayera random image ma kam gareko ho
     */
    event.imageUrl.replace("seed", Math.floor(Math.random() * 100));

    const eventDB = new Event(event);
    await eventDB.save();

    console.log(
      event.title,
      " has been added to the Event collection of database"
    );
  };

  // Calling the function
  createEvent(event);
});
