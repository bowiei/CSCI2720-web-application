const router = require("express").Router();
const Event = require("../model/event.model");

// Read all events
router.route("/").get((req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new event
router.route("/add").post((req, res) => {
  const eventName = req.body.eventName;
  const date = req.body.date;
  const location = req.body.location;

  const newEvent = new Event({
    eventName,
    date,
    location,
  });

  newEvent
    .save()
    .then(() => res.json("Event added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read a specific event by ID
router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific event by ID
router.route("/update/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      event.eventName = req.body.eventName;
      event.date = req.body.date;
      event.location = req.body.location;

      event
        .save()
        .then(() => res.json("Event updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a specific event by ID
router.route("/delete/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
