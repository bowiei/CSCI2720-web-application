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

// Read a specific user by ID
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific user by ID
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a specific user by ID
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
