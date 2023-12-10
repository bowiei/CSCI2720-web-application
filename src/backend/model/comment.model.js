const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentID: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
