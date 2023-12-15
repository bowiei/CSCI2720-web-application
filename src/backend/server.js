const express = require("express");
const cors = require("cors");
const app = express();
const insertDefaultDB = require("./database.setup");
const Venue = require("./model/venue.model");

app.use(cors());

// app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const port = process.env.PORT || 5500;

const mongoose = require("mongoose");
const dbURI = "mongodb://127.0.0.1:27017/csci2720-project";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Print out the collections in the database
    mongoose.connection.db
      .listCollections()
      .toArray()
      .then(async (collections) => {
        console.log("Collections in the database:");
        for (const collection of collections) {
          console.log(collection.name);
        }
      });
    Venue.find({})
      .then((documents) => {
        const count = documents.length;
        console.log(count + " location data in database");
        if (count >= 10) {
          console.log("Skip import json to database");
          return;
        } else {
          insertDefaultDB();
        }
      })
      .catch((err) => {
        console.error("Error retrieving documents from 'venues' collection:", err);
      });
    
      
    //insertDefaultDB();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const venueRouter = require("./routes/venue");

app.use("/comment", commentRouter);
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/venue", venueRouter);
app.listen(port, () => console.log(`listening in port ${port}`));

module.exports = app;
