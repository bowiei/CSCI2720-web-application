const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  venueID: { type: String, required: true },
  userID: { type: String, required: true },
  comment: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
