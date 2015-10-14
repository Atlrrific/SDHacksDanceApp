// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

// define the schema for our user model
var usereventSchema = mongoose.Schema({

    userevent          : {
         _id:    {type:ObjectIdSchema, default: function () { return new ObjectId()} },
        useremail     : String,
        eventid     : String,
        status     : String
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('UserEvents', usereventSchema);