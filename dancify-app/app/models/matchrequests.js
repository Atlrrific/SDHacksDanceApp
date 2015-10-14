// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

// define the schema for our user model
var userMatchReq = mongoose.Schema({
    // matchrequest : {
    //     useremail  : String,
    //     eventid : String,
    //     gender : String,
    //     type : String,
    //     skill : String
    // }

    // matches           : {
    // 	id          : String,
    //     email       : String,
    //     eventid   	: String,
    //     gender  	: String,
    //     type  		: String,
    //     skill  		: String,
    // }

    matches           : {
        _id:    {type:ObjectIdSchema, default: function () { return new ObjectId()} },
        useremail   : String,
        eventid   : String,
        gender  : String,
        skill  		: String,
        dance  		: String,
        userSkill  		: String,
        // danceType  : String,
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('UserMatchRequests', userMatchReq);