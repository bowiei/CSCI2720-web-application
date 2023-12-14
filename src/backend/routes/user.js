const router = require("express").Router();
const User = require("../model/user.model");

const express = require("express");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Read all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new user
router.route("/register").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role || "user"; // Default role is "user" if not provided

  const newUser = new User({
    username,
    password,
    role,
  });

  newUser
    .save()
    .then(() => res.json("User registered!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").put((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role || "user"; // Default role is "user" if not provided

  const newUser = new User({
    username,
    password,
    role,
  });

  newUser
    .save()
    .then(() => res.json("User registered!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read a specific user by username
router.route("/:username").get((req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific user by username post
router.route("/update/:username").post((req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      user.username = req.params.username;
      user.password = req.body.password;
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific user by username put
router.route("/update/:username").put((req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      user.username = req.params.username;
      user.password = req.body.password;
      user.role = req.body.role;
      
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


// Delete a specific user by username
router.route("/delete/:username").delete((req, res) => {
  User.findOneAndDelete({ username: req.params.username })
    .then(() => res.json("User deleted: " + req.params.username))
    .catch((err) => res.status(400).json("Error: " + err));
});

//route for adding favourite locations
router.route("/add/:username").put((req, res) => {
  const { username } = req.params;
  const { venueID } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      Venue.find({ venueID: venueID })
        .then((venues) => {
          const favoriteVenueIds = venues.map((venue) => venue._id);
          const existingFavorites = favoriteVenueIds.filter((id) =>
            user.favoriteLocations.includes(id)
          );

          if (existingFavorites.length > 0) {
            return res
              .status(400)
              .json("Location already exists in favorites");
          }

          user.favoriteLocations = [
            ...user.favoriteLocations,
            ...favoriteVenueIds,
          ];

          user
            .save()
            .then(() => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//route for remove items in favloc
router.route("/remove/:username").put((req, res) => {
  const { username } = req.params;
  const { venueID } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      }

      Venue.find({ venueID: venueID })
        .then((venues) => {
          const favoriteVenueIds = venues.map((venue) => venue._id.toString());
          const index = user.favoriteLocations.findIndex((id) => favoriteVenueIds.includes(id.toString()));
          if (index === -1) {
            return res.status(404).json("Location does not exist");
          }

          user.favoriteLocations.splice(index, 1);

          user
            .save()
            .then(() => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
