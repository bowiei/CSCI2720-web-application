const router = require("express").Router();
const Venue = require("../model/venue.model");

// Read all venues
router.route("/venues").get((req, res) => {
  Venue.find()
    .then((venues) => res.json(venues))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new venue
router.route("/venues/add").post((req, res) => {
  const venueName = req.body.venueName;
  const location = req.body.location;
  const capacity = req.body.capacity;

  const newVenue = new Venue({
    venueID: req.body.venueID,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    events: req.body.events,
  });

  newVenue
    .save()
    .then(() => res.json("Venue added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read a specific venue by ID
router.route("/venues/:id").get((req, res) => {
  Venue.findById(req.params.id)
    .then((venue) => res.json(venue))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific venue by ID
router.route("/venues/update/:id").post((req, res) => {
  Venue.findById(req.params.id)
    .then((venue) => {
      venue.venueName = req.body.venueName;
      venue.location = req.body.location;
      venue.capacity = req.body.capacity;

      venue
        .save()
        .then(() => res.json("Venue updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a specific venue by ID
router.route("/venues/delete/:id").delete((req, res) => {
  Venue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Venue deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
