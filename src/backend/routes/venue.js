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

// Read a specific venue by ID
router.route("/:id").get((req, res) => {
  Venue.findById(req.params.id)
    .then((venue) => res.json(venue))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific venue by ID
router.route("/update/:id").post((req, res) => {
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
