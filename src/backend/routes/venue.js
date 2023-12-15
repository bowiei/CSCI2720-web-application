const router = require("express").Router();
const Venue = require("../model/venue.model");
const Comment = require("../model/comment.model");
const express = require("express");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Read all venues
router.route("/").get((req, res) => {
  Venue.find()
    .then((venues) => res.json(venues))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new venue
router.route("/add").post((req, res) => {
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

// Read a specific venueID
router.route("/:venueID").get((req, res) => {
  Venue.findOne({ venueID: req.params.venueID })
    .then((venue) => res.json(venue))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read a _id
router.route("/find/:objectID").get((req, res) => {
  const objID = req.params.objectID;
  Venue.findOne({ _id: objID})
    .then((venue) => res.json(venue))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read the name of a venue
router.route("/name/:venueName").get((req, res) => {
  const venueName = req.params.venueName;
  Venue.findOne({ address: venueName})
    .then((venue) => res.json(venue))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific venueID
router.route("/update/:venueID").post((req, res) => {
  Venue.findOne({ venueID: req.params.venueID })
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

router.route("/delete/v/:venueID/e/:eventID").delete((req, res) => {
  const venueID = req.params.venueID;
  const eventIDToDelete = req.params.eventID;

  Venue.findOne({ venueID: venueID })
    .then((venue) => {
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }

      const eventIndex = venue.events.findIndex((eventID) => eventID === eventIDToDelete);
      if (eventIndex === -1) {
        return res.status(404).json({ message: "Event not found in the venue" });
      }

      venue.events.splice(eventIndex, 1);

      return venue.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Event deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

router.route("/add/v/:venueID/e/:eventID").put((req, res) => {
  const venueID = req.params.venueID;
  const eventIDToAdd= req.params.eventID;
  Venue.findOne({ venueID: venueID })
    .then((venue) => {
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      venue.events.push(eventIDToAdd);
      return venue.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Event added successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Add comment ._id to venue
router.route("/add/v/:venueID/c/:commentID").put((req, res) => {
    const venueID = req.params.venueID;
    const commentID= req.params.commentID;
    // Find the venue document with the matching venueID
    Venue.findOne({ venueID })
    .then((venue) => {
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      venue.comments.push(commentID);
      return venue.save();
    })
    .catch((err) => { 
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Return a comment json by venueID
router.route("/comment/v/:venueID").get((req, res) => {
  Venue.findOne({ venueID: req.params.venueID })
    .then((venue) => {
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      res.json(venue.comments);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    })  
});

router.route("/update/oldv/:oldVenueID/newv/:newVenueID/e/:eventID").put((req, res) => {
  Venue.findOne({ venueID: req.params.oldVenueID })
    .then((venue) => {
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      const eventIndex = venue.events.findIndex((eventID) => eventID === req.params.eventID);
      if (eventIndex === -1) {
        return res.status(404).json({ message: "Event not found in the venue" });
      }
      venue.events.splice(eventIndex, 1);
      return venue.save();
    })
    .then(() => {
      Venue.findOne({ venueID: req.params.newVenueID })
        .then((venue) => {
          if (!venue) {
            return res.status(404).json({ message: "Venue not found" });
          }
          venue.events.push(req.params.eventID);
          return venue.save();
        })
        .then(() => {
          return res.status(200).json({ message: "Event updated successfully" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
  });

module.exports = router;
