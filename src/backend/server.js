const express = require("express");
const cors = require("cors");
const app = express();
const insertDefaultDB = require("./database.setup");
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const port = process.env.PORT || 5000;
// const port = process.env.PORT || 6000;

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
      .then((collections) => {
        console.log("Collections in the database:");
        collections.forEach((collection) => {
          console.log(collection.name);
        });
      });
    insertDefaultDB();
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
