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

module.exports = router;
