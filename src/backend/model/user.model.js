const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favoriteLocations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Venue" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
