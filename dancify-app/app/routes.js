// app/routes.js

// load up the user model
var UserEvent  = require('../app/models/userevents.js');
var UserMatchRequests  = require('../app/models/matchrequests.js');
var UserMatches  = require('../app/models/matches.js');
var Users  = require('../app/models/user.js');



module.exports = function(app, passport,yelp) {

    // =====================================
    // YELP DATA (with login links) ========
    // =====================================
    app.get('/yelp', function(req, res) {
        // res.render('index.ejs'); // load the index.ejs file

        yelp.search({term: "dance salsa", location: "San Diego,CA",limit:15}, function(error, data) {
          // console.log(error);
          // console.log(data);
          res.send(data);
        });
    });

    // =====================================
    // USEREvents DATA (with login links) ========
    // =====================================
    app.get('/userevents',/*isLoggedIn,*/ function(req, res) {
        // res.render('index.ejs'); // load the index.ejs file

        var user_id = req.param('id');
        var name = req.param('name');
        var image = req.param('image');  
        var url = req.param('url');  
        var location = req.param('location');  
        console.log(user_id + "  " +  name + "  " + image );


        var newEvent          = new UserEvent();

                // set the user's local credentials
                newEvent.userevent.eventid    = user_id;
                newEvent.userevent.useremail = req.user.local.email;;
                newEvent.userevent.status = "going";
                newEvent.userevent.id ="12318273-901";

                // save the user
                newEvent.save(function(err) {
                    if (err)
                        return next (err);
                    return ;
                    // return done(null, newEvent);
                });

        res.send(200);
    });

    app.post('/userevents',isLoggedIn, function(req, res) {
        var newEvent          = new UserEvent();

        console.log(newEvent);
        // set the user's local credentials
        newEvent.userevent.eventid    = req.body.eventid;
        newEvent.userevent.useremail = req.user.email;;
        newEvent.userevent.status = req.body.status;

        console.log(newEvent);
        // save the user
        newEvent.save(function(err,newEvent) {
            console.log("In Callback");
             console.log(err);
            if (err) {return err};
            return ;
            // return newEvent;
        });

        res.send(200);
    });

    // =====================================
    // UserMatches DATA (with login links) ========
    // =====================================
    app.post('/matchrequest'/*,isLoggedIn*/, function(req, res) {
        var newMatches  = new UserMatchRequests();

        // console.log(newMatches);
        // set the user's local credentials
        // newRequest.matchrequest.eventid    = req.body.eventid;
        // newRequest.matchrequest.useremail = req.body.email;
        // newRequest.matchrequest.gender = req.body.gender;
        // newRequest.matchrequest.type = req.body.type;
        // newRequest.matchrequest.skill = req.body.skill;
        // newRequest.matchrequest.datetime = req.body.datetime;

        newMatches.matches.useremail = req.body.useremail;
        newMatches.matches.eventid = req.body.eventid;
        newMatches.matches.gender = req.body.gender;
        newMatches.matches.skill = req.body.skill;
        newMatches.matches.dance = req.body.danceType;

        // console.log(newMatches);
        // save the user
        newMatches.save(function(err,newMatches,next) {
            console.log("In Callback");
             console.log(err);
            if (err) {return next(err)};
            return res.send('')  ;
            // return newEvent;
        });

        console.log("Printing body of the function");
        console.log(req.body);
        UserMatchRequests.findOne( { 'matches.eventid' : req.body.eventid  ,
                                    'matches.dance':req.body.danceType,
                                    'matches.skill':req.body.skill },function(err, matchreq,next) {
            


            console.log("Request HERE");                           
            console.log(matchreq);
            // if there are any errors, return the error
            if (err)
                // res.send(err);
                return next(err); 
            if(matchreq !== null){
                console.log("It was not null");
                if(req.user.email !== matchreq.matches.useremail){
                    console.log("Second If for email");
                    Users.findOne( { 'local.Gender' :  req.body.gender, 'local.email' : matchreq.matches.useremail },function(err, matches,next) {
                        

                        console.log("Inside Proving gender");
                        console.log(matches);
                        // if there are any errors, return the error
                        if (err)
                        // res.send(err);
                        return next(err); ;

                        


                        var newMatches  = new UserMatches();

                        console.log(newMatches);
                        // set the user's local credentials
                        newMatches.matches.user1email = req.body.email;
                        newMatches.matches.user2email = matches.local.email;
                        newMatches.matches.user1status = '';
                        newMatches.matches.user2status = '';

                        console.log(newMatches);
                        // save the user
                        newMatches.save(function(err,newMatches) {
                            console.log("In Callback");
                             console.log(err);
                            if (err) {return err};
                            return ;
                            // return newEvent;
                        });

                        res.send(200);

                        // check to see if theres already a user with that email
                        //data = matches;
                        // console.log(matchreq);
                        res.json(matches);
                        res.send(matches);
                        return;

                    });
                }
            }

            // check to see if theres already a user with that email
            data = matchreq;
            // console.log(matchreq);
            res.json(matchreq);
            res.send(matchreq);
            return;
        });



        res.send(200);
    });

    app.get('/matchrequest', /*isLoggedIn,*/ function(req, res, next) {
        UserMatchRequests.find( { 'matches.useremail' : 'ramon@yes.com' /*req.user.email */},function(err, matchreq) {
            console.log(matchreq);
            // if there are any errors, return the error
            if (err)
                return next(err) ;

            // check to see if theres already a user with that email
            // console.log(matchreq);
            res.json(matchreq);
            
            if(!matchreq){
                next();
                // next('route');
            }
            return res.send(matchreq);;
        }); 

         // res.send("WhatUp");
        
    });

    // =====================================
    // Matches DATA (with login links) ========
    // =====================================
    app.post('/matches', function(req, res) {

        var newMatches  = new UserMatches();

        console.log(newMatches);
        // set the user's local credentials
        newMatches.matches.user1email    = req.body.eventid;
        newMatches.matches.user1email = req.body.email;
        newMatches.matches.user1email = req.body.gender;
        newMatches.matches.user1email = req.body.type;

        console.log(newMatches);
        // save the user
        newMatches.save(function(err,newMatches) {
            console.log("In Callback");
             console.log(err);
            if (err) {return err};
            return ;
            // return newEvent;
        });

        res.send(200);
    });

    app.get('/matchesUser1', /*isLoggedIn,*/ function(req, res,next) {
        var data;
        UserMatches.find( { 'matches.user2email' :  'ramon@yes.com'},function(err, matchreq) {
            console.log(matchreq);
            // if there are any errors, return the error
            if (err)
                return next(err) ;

            // check to see if theres already a user with that email
            // console.log(matchreq);
            res.json(matchreq);
            
            if(!matchreq){
                next();
                // next('route');
            }
            return res.send(matchreq);;
        });
    });

    app.get('/matchesUser2', isLoggedIn, function(req, res,next) {
        var data;
        UserMatches.findOne( { 'matches.user2email' :  req.user.email },function(err, matchreq) {
            console.log(matchreq);
            // if there are any errors, return the error
            if (err)
                return next(err) ;

            // check to see if theres already a user with that email
            // console.log(matchreq);
            res.json(matchreq);
            
            if(!matchreq){
                next();
                // next('route');
            }
            return res.send(matchreq);;
        });
    });



    app.post('/matches', function(req, res) {

        var newMatches  = new UserMatches();

        console.log(newMatches);
        // set the user's local credentials
        newMatches.matches.user1email    = req.body.eventid;
        newMatches.matches.user1email = req.body.email;
        newMatches.matches.user1email = req.body.gender;
        newMatches.matches.user1email = req.body.type;

        console.log(newMatches);
        // save the user
        newMatches.save(function(err,newMatches) {
            console.log("In Callback");
             console.log(err);
            if (err) {return err};
            return ;
            // return newEvent;
        });

        res.send(200);
    });
    

    

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        // successRedirect : '/finishsignup', // redirect to the secure profile section
        // failureRedirect : '/signup', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/finishsignup', isLoggedIn, function(req, res) {
        yelp.search({term: "dance salsa", location: "San Diego,CA"}, function(error, data) {
          // console.log(error);
          // console.log(data); 

          res.render('signup2.ejs', {
            user : req.user, // get the user out of session and pass to template
            yelpData :  data
            });           
        })
    });



    // process the signup form
    app.post('/signup2', isLoggedIn, function(req, res) {
        var userInfo =  new Users({'local.Gender':req.body.gender,
                                   'local.email':req.user.local.email,
                                   'local.password': req.user.local.password,
                                   'local.firstName':req.body.firstName,
                                    'local.lastName':req.body.lastName});
        console.log(userInfo);
        var upsertData = userInfo.toObject();
        // console.log(req.user);
        delete upsertData._id;
        console.log(req.user._id);
        Users.update({'_id':req.user._id}, upsertData, {upsert: true}, 
            function(err){
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
        // console.log(req.body.gender);
        // var query1 = {'local.email':req.user.email};
        // // req.newData.username = req.user.username;
        // Users.findOneAndUpdate({'local.email':req.user.email}, 
        //     {'local.Gender':req.body.gender,'local.firstName': req.body.firstName }, 
        //     {}, function(err, doc){
        //     if (err) return res.send(500, { error: err });
        //     return res.send("succesfully saved");
        // });



        // Users.findOne( { 'local.email' :  req.user.email },function(err, userFound) {
        //     console.log(matchreq);
        //     // if there are any errors, return the error
        //     if (err)
        //         // res.send(err);
        //         return next(err); ;

        //     // check to see if theres already a user with that email
        //     // console.log(matchreq);
        //     // var newMatches  = new User();

        //     console.log(userFound);
        //     // set the user's local credentials
        //     userFound.local.Gender    = req.body.gender;
        //     userFound.local.firstName = req.body.firstName;
        //     userFound.local.lastName = req.body.lastName;
        //     // userFound.local.user1email = req.body.type;

        //     console.log(userFound);
        //     // save the user
        //     userFound.save(function(err,userFound) {
        //         console.log("In Callback");
        //          console.log(err);
        //         if (err) {return err};
        //         return ;
        //         // return newEvent;
        //     });

        //     res.send(200);


        //     res.json(matchreq);
        //     res.send(matchreq);
        //     return;
        // }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        // successRedirect : '/profile', // redirect to the secure profile section
        // failureRedirect : '/login', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        yelp.search({term: "dance salsa", location: "San Diego,CA"}, function(error, data) {
          // console.log(error);
          // console.log(data); 

          res.render('profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            yelpData :  data
            });           
        })
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(app, req, res, next) {

    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://192.168.43.214:8100/');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }

    app.use(allowCrossDomain);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}