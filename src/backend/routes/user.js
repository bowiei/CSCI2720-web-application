const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const Venue = require("../model/venue.model");
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

// Login route

router.route("/login").post((req, res) => {
  const { username, password } = req.body;

  // Search for a user by username
  User.findOne({ username })
    .then((user) => {
      // Check if the user exists and the password matches
      if (user && user.password === password) {
        // Create a cookie and session
        // Generate a random key
        const key = Math.random().toString(36).substring(2, 12);

        // Hash the key with the username
        const keyHash = bcrypt.hashSync(username + key, 10);
        // console.log(keyHash,username,password);
        User.findOneAndUpdate({ username: username }, { keyHash: keyHash })
          .then(() => {
            // Set the cookie with the hashed key
            res.cookie("session", keyHash, { maxAge: 86400000, httpOnly: true });
            console.log("session key:", keyHash);
            res.status(200).json({ message: "Login successful" });
          })
          .catch((err) => {
            res.status(500).json({ error: "Error: " + err });
          });
      } else {
        res.status(401).json("Invalid username or password.");
      }
    })
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
router.route("/add_fav/:username").put((req, res) => {
  const { username } = req.params;
  const { venueID } = req.body;

  Venue.findOne({ venueID })
    .then((venue) => {
      if (!venue) {
        return res.status(500).json("Error: Venue not found");
      }

      User.findOneAndUpdate({ username }, { $addToSet: { favoriteLocations: venue._id } })
        .then((user) => {
          if (!user) {
            return res.status(500).json("Error: User not found");
          }
          return res.status(200).json(user);
        })
        .catch((err) => res.status(500).json("Error: " + err));
    })
    .catch((err) => res.status(500).json("Error: " + err));
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
