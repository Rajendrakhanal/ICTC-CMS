const Event = require("../models/Event");

exports.getEvents = async(req, res) => {
  Event.find().then((events) => {
    res.status(200).json({
      events,
    });
  });
};

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      type,
      instructors,
      participants,
      description,
      organizer,
      imageUrl,
    } = req.body;
    // if there are errors, return bad request and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const posts = new Event({
      title,
      description,
      type,
      instructors,
      participants,
      organizer,
      imageUrl,
    });
    const savedPosts = await posts.save();

    res.json(savedPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    let event = Event.findById(req.params.id);
    if (!event) {
      res.send("No event found");
    } else {
      event = await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ Success: "Successfully deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateEvent = async (req, res) => {
  try {
    let event = Event.findById(req.params.id);
    if (!event) {
      res.status(404).send("No service");
    } else {
      event = await Event.findByIdAndUpdate(req.params.id);
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
