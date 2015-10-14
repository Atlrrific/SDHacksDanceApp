// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var eventsSchema = mongoose.Schema({

    events        : {
        id           : String,
        type        : String,
        location      : String,
        address       : String,
        description   : String,
        datetime      : Date,
        pic         :String,


    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('events', eventsSchema);