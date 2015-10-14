// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var matchesSchema = mongoose.Schema({
    matches           : {
        id           : String,
        user1email   : String,
        user2email   : String,
        user1status  : String,
        user2status  : String,
    }

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Matches', matchesSchema);