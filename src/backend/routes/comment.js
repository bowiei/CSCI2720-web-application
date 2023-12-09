const router = require("express").Router();
const Comment = require("../model/comment.model");

// Read all comments
router.route("/").get((req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a new comment
router.route("/add").post((req, res) => {
  const venueID = req.body.venueID;
  const userID = req.body.userID;
  const comment = req.body.comment;
  const datetime = new Date();

  const newComment = new Comment({
    venueID,
    userID,
    comment,
    datetime,
  });

  newComment
    .save()
    .then(() => res.json("Comment added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Read a specific comment by ID
router.route("/:id").get((req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific comment by ID
router.route("/update/:id").post((req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      comment.venueID = req.body.venueID;
      comment.userID = req.body.userID;
      comment.comment = req.body.comment;
      comment.datetime = new Date();

      comment
        .save()
        .then(() => res.json("Comment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
 
// Delete a specific comment by ID
router.route("/delete/:id").delete((req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Comment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
