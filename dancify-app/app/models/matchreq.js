// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


// var Schema = mongoose.Schema;
// var ObjectIdSchema = Schema.ObjectId;
// var ObjectId = mongoose.Types.ObjectId;

// define the schema for our user model
var matchreqSchema = mongoose.Schema({

    
    matchreq           : {
        // _id:    {type:ObjectIdSchema, default: function () { return new ObjectId()} },
        useremail   : String,
        gender        : String,
        type         : String,
        skill      : String,
        eventid    :String,
        datetime   : Date
    }

});


// create the model for users and expose it to our app
module.exports = mongoose.model('MatchReqs', matchreqSchema);