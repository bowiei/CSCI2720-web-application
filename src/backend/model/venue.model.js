const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const venueSchema = new Schema({
  venueID: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  events: { type: [String], required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
