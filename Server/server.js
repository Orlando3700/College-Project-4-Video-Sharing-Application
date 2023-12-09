//initialize the use of the express library
var express = require('express');
//create an instance of the express library
var app = express();

// Register the 'session' middleware. The middleware will append
// the session to the req object of every route
var sessionMiddleware = require('./Logic/session');

//build paths to your files
const path = require('path');

// use pug to render all videos
app.set('view engine', 'pug');

// __dirname is an environment variable that tells
// you the absolute path of the directory containing
// the currently executing file
// It will help look for pug files
app.set('views', path.join(__dirname, 'Views'));

//css file is stored in resource folder.
app.use('/resource', express.static('Resources'));

//registers the middleware
app.use(express.json());


//This line of code is configuring middleware
//in an Express application to parse requests
//with a URL-encoded format. The express.urlencoded
//middleware is used to parse this data when the server receives it.
app.use(express.urlencoded({extended:true}));

//location of database.json
// Specify where the database file is stored
db_connection = __dirname + "/Database/database.json"

// define a schema (i.e. a JSON object) for the database.
schema = {    users: []
}

//providing database connection
global.db = require("./Database/fsdb")(db_connection, schema);

// Register the 'session' middleware.
app.use(sessionMiddleware);

//Routes
 var apiRoutes = require('./Logic/Routes');
 app.use('/auth', apiRoutes);

 var videoRoutes = require('./Logic/VideoRoute');
 app.use('/video',videoRoutes);

//Start a server
app.listen(3000, function () {
    console.log('Service running on port 3000!');
});

