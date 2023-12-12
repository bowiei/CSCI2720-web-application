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

// Create a new event need check
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

// Read a specific event by ID ,done 
router.route("/:eventID").get((req, res) => {
  Event.findOne( { eventID : req.params.eventID })
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific event by ID
router.route("/update/:eventID").post((req, res) => {
  Event.findOne({ username: req.params.username })
  .then((event) => {
    event.eventID = req.params.id;
    event.title = req.body.title;
    event.progtimee = req.body.progtimee;
    event.date = req.body.date;
    event.venue = req.body.venue;
    event.price = req.body.price;
    event.description = req.body.description;
    event.presenterorge = req.body.presenterorge;
    
    event
      .save()
      .then(() => res.json("User updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  })
});

// Delete a specific event by ID
router.route("/delete/:eventID").delete((req, res) => {
  Event.findOneAndDelete({ eventID: req.params.eventID })
  .then(() => res.json("Event deleted: " + req.params.eventID))
  .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
