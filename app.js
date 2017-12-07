var express = require('express');
var app = express();
var mongoose = require('mongoose');
// module for maintaining sessions
//var prodModel = mongoose.model('Product');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('express-flash');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// path is used the get the path of our files on the computer
var path = require ('path');
var favicon = require('serve-favicon');



passport.use(new LocalStrategy(function (userName,password,done){

  userModel.findOne({userName:userName},function(err,myuser){
    if (err) return done(err);
    if (!myuser) return done(null,false,{message : 'Incorrect username'});
    myuser.comparePassword(password,function(err,isMatch){
      if (isMatch) {

        return done(null,myuser);
    }
      else {

        return done(null,false,{message: 'Incorrect password'});
      }
  });
});

}));

passport.serializeUser(function(myuser, done) {
  done(null, myuser.id);
});

passport.deserializeUser(function(id, done) {
  userModel.findById(id, function(err, myuser) {
    done(err, myuser);
  });
});


// fs module, by default module for file management in nodejs
var fs = require('fs');

//include all our model files
fs.readdirSync('./app/models').forEach(function(file){
  // check if the file is js or not
  if(file.indexOf('.js'))
    // if it is js then include the file from that folder into our express app using require
    require('./app/models/'+file);

});// end for each

var userModel = mongoose.model('myUser');


var dbPath  = "mongodb://localhost/mysocialDb";

// command to connect with database
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

  console.log("database connection open success");

});

//Middleware
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/app/views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, '/libs/ico', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
// initialization of session middleware 

app.use(session({
  name :'myCustomCookie',
  secret: 'myAppSecret', // encryption key 
  resave: true,
  httpOnly : true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// set the templating engine 
app.set('view engine', 'jade');

//set the views folder
app.set('views',path.join(__dirname + '/app/views'));



// include controllers
fs.readdirSync('./app/controllers').forEach(function(file){
	if(file.indexOf('.js')){
		// include a file as a route variable
		var route = require('./app/controllers/'+file);
		//call controller function of each file and pass your app instance to it
		route.controllerFunction(app)
    
	}

});//end for each


//including the auth file
var auth = require('./middlewares/authentication');
// set the middleware as an application level middleware
// middleware to check whether the user is valid or not

app.use(function(req,res,next){

  if(req.session && req.session.myuser){
    userModel.findOne({'email':req.session.myuser.email},function(err,myuser){

      if(myuser){
        //req.myuser = myuser;
        //delete req.myuser.password; 
        req.session.myuser = myuser;
        delete req.session.myuser.password;
        next();
      }
      else{
        // do nothing , because this is just to set the values
      }
    });
  }
  else{
    next();
  }


});//


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });	

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});