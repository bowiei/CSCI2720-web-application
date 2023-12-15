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
  console.log("adding rext: ", venueID);
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

// Delete a specific venue by ID
router.route("/delete/:id").delete((req, res) => {
  Venue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Venue deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add a comment to venue
router.route("/addComment").post(async (req, res) => {
  try {
    const { venueID, username, comment } = req.body;

    // Create a new comment document with a unique commentID
    const newComment = new Comment({
      username,
      comment,
      datetime: Date.now(),
    });
    await newComment.save();

    // Find the venue document with the matching venueID
    const venue = await Venue.findOne({ venueID });

    if (venue) {
      // Add the new comment's ObjectId to the venue's comments array
      venue.comments.push(newComment._id);
      await venue.save();
    } else {
      // If the venue is not found, you can choose to handle it based on your requirements
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Return a json by venueID
router.route("/venues/comment").get(async (req, res) => {
  try {
    const venueID = req.query.venueID;

    // Find the venue document with the matching venueID
    const venue = await Venue.findOne({ venueID });

    if (venue) {
      // Fetch the comments associated with the venue
      const comments = await Comment.find({ _id: { $in: venue.comments } });

      res.status(200).json(comments);
    } else {
      // If the venue is not found, you can choose to handle it based on your requirements
      res.status(404).json({ message: "Venue not found" });
    }
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
