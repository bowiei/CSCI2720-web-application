const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    progtimee: { type: String, required: true },
    date: { type: [String], required: true },
    venue: {
      venueID: { type: String, required: true },
      address: { type: String, required: true },
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    price: { type: String, required: true },
    description: { type: String, required: true },
    presenterorge: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
