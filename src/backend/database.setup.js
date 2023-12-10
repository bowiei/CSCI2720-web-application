const CommentModel = require("./model/comment.model"); 
const EventModel = require("./model/event.model"); 
const UserModel = require("./model/user.model"); 
const VenueModel = require("./model/venue.model"); 
const fs = require("fs");

const insert = (route, model) => {
    fs.readFile(route, "utf8", (error, data) => {
        if (error) {
            console.error("Error reading JSON file:", error);
            return;
        }
        try {
            const dataname = JSON.parse(data);
            model.insertMany(dataname)
            .then((result) => {
              console.log("Comments saved successfully:", result);
            })
            .catch((error) => {
              console.error("Error on saving:", error);
            });
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    });
}

const insertDefaultDB = () => {
    insert(require('path').resolve(__dirname, '../assets/data/event.json'), EventModel);
    insert(require('path').resolve(__dirname, '../assets/data/user.json'), UserModel);
    insert(require('path').resolve(__dirname, '../assets/data/venue.json'), VenueModel);
    insert(require('path').resolve(__dirname, '../assets/data/comments.json'), CommentModel);
}

module.exports = insertDefaultDB;