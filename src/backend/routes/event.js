const router = require("express").Router();
const Event = require("../model/event.model");
const express = require("express");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Read all events
router.route("/").get((req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new event
router.route("/add").post((req, res) => {
  const eventID = req.body.eventID;
  const title = req.body.title;
  const progtimee = req.body.progtimee;
  const date = req.body.date;
  const venue = req.body.venue;
  const price = req.body.price;
  const description = req.body.description;
  const presenterorge = req.body.presenterorge;

  const newEvent = new Event({
    eventID,
    title,
    progtimee,
    date,
    venue,
    price,
    description,
    presenterorge,
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
  const eventID = req.params.id;
  const title = req.body.title;
  const progtimee = req.body.progtimee;
  const date = req.body.date;
  const venue = req.body.venue;
  const price = req.body.price;
  const description = req.body.description;
  const presenterorge = req.body.presenterorge;

  Event.findByIdAndUpdate(
    eventID,
    {
      title,
      progtimee,
      date,
      venue,
      price,
      description,
      presenterorge,
    },
    { new: true }
  )
    .then(() => res.json("Event updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a specific event by ID
router.route("/delete/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
