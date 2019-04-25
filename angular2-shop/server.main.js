// Load Node environment variable configuration file
import {validateEnvVariables} from './config/env.conf.js';

// Set up appropriate environment variables if necessary
validateEnvVariables();

// # Modules

// Load Express
import express from 'express';
// Load Socket.io
import socketio from 'socket.io';
// Load Node http module
import http from 'http';
// Create our app with Express
let app = express();
// Create a Node server for our Express app
let server = http.createServer(app);
// Integrate Socket.io
let io = socketio.listen(server);
// Load Mongoose for MongoDB interactions
import mongoose from 'mongoose';
// Log requests to the console (Express 4)
import morgan from 'morgan';
// Pull information from HTML POST (express 4)
import bodyParser from 'body-parser';
// Simulate DELETE and PUT (Express 4)
import methodOverride from 'method-override';
// PassportJS
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';


import jwt    from  'jsonwebtoken'; // used to create, sign, and verify tokens

// # Configuration

// Load Socket.io server functionality
import base from './sockets/base';

base(io);

// Set the port for this app
let port = process.env.PORT || 8080;

// Load Mongoose config file for connecting to MongoDB instance
import mongooseConf from './config/mongoose.conf.js';

// Pass Mongoose configuration Mongoose instance
mongooseConf(mongoose);

// Import PassportJS configuration
import passportConf from './config/passport.conf.js';


//var express = require('express');
var multer = require('multer');
var fs = require('fs');

var path = require('path')
//var multer = require('multer')

var crypto = require('crypto')

var fs = require('fs');
//, gm = require('gm').subClass({imageMagick: true});
var gm = require('gm');


//var app = express();

var DIR = './uploads/';

//var upload = multer({dest: DIR});
/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(multer({
  dest: DIR,
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
}));
*/

// Pass Passport configuration our PassportJS instance
passportConf(passport);

if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test')
  // Log every request to the console
  app.use(morgan('dev'));

// Read cookies (needed for authentication)
app.use(cookieParser());

// ## Get all data/stuff of the body (POST) parameters

// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// Angular JS client files will be served from dist dir
// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/dist'));

// ## Passport JS

// Session secret
app.use(session({

  secret : process.env.SESSION_SECRET,

  resave : true,

  saveUninitialized : true
}));

app.use(passport.initialize());

// Persistent login sessions
app.use(passport.session());

//var upload = multer({ dest: 'uploads/' });
var mime = require('mime')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});


var storage2 = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage });


// resize and remove EXIF profile data
//gm('/path/to/my/img.jpg')
//.resize(240, 240)

// single file upload 
app.post('/api/upload', upload.single('file'), function (req, res, next) {
   console.log('uploaded');
   console.log('Name',req.file);   
	// req.file is the `avatar` file
	
	var path=req.file.path;
	
	//gm(path).resize(240, 240);
	
	gm(path).resize(240, 250).write(path+".t.jpg", function(err){
		if (err) 
			console.log("Error: " + err);
		console.log("resized " );
		});

	console.log('uploaded-renamed');
	res.end('File is uploaded');
	
	/*
	req.file after upload
	{ fieldname: 'file',
  originalname: 'a.jpe',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '7d7df69544b8de3634da878d90444cd7',
  path: 'uploads\\7d7df69544b8de3634da878d90444cd7',
  size: 1277391 }
	*/
  
})


/*
app.use(multer({
  dest: DIR,
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
}));
*/

/*
app.get('/api/upload', function (req, res) {
	    console.log(' /api/upload get is starting ...');

	
  res.end('file catcher example');
});

app.post('/api/upload', function (req, res) {
	
  console.log(' /api/upload post is starting ...');

  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }

    res.end('File is uploaded');
  });
});
*/

// ## Routes


// Get an instance of the express Router
let router = express.Router();

// Load our application API routes
// Pass in our express and express router instances
import routes from './server/routes';

// Pass in instances of the express app, router, and passport
routes(app, router, passport);

// ### Ignition Phase


server.listen(port);

// Shoutout to the user
console.log(`ng2 with upload eCommercee server is running  on port ${port}`);

// Expose app
export {app};

