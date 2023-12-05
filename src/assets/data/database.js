const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/csci2720-project');

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully

db.once('open', function () {
    console.log("Connection is open...");

    const dataJson = fs.readFileSync('../data/data.json', 'utf8');
    const data = JSON.parse(dataJson);

    const eventSchema = mongoose.Schema ({ 
        "eventID": {"type": String, "required": true},
        "title": {"type": String, "required": true},
        "progtimee": {"type": String, "required": true},
        "date": {"type": [String], "required": true},
        "venue": {
            "venueID": {"type": String, "required": true},
            "address": {"type": String, "required": true},
            "latitude": {"type": String, "required": true},
            "longitude": {"type": String, "required": true}
        },
        "price": {"type": String, "required": true},
        "description": {"type": String, "required": true},
        "presenterorge": {"type": String, "required": true} 
    },
    {
        versionKey: false
    });
    const Event = mongoose.model('Event', eventSchema);

    Event.insertMany(data)
    .then((result) => {
        const promises = result.map(() => {
        return Promise.resolve(); // Promise ensure the insertion are done
        });
        return Promise.all(promises);
    })
    .then(() => {
        console.log("event saved successfully");
    })
    .catch((err) => {
        console.error(err);
    });
})