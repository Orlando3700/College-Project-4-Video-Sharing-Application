//initialize the use of the express library
const express = require('express');

//build paths to your files
const path = require('path');

// Register the 'session' middleware. The middleware will append
// the session to the req object of every route
const middlewareSession = require('./Logic/session');

//Routes
const apiRoutes = require('./Logic/Routes');
const videoRoutes = require('./Logic/VideoRoute');

//providing database connection
const fsdb = require('./Database/fsdb');

//create an instance of the express library
const app = express();

const PORT = process.env.PORT || 3000;

//location of database.json
// Specify where the database file is stored
const DB_PATH = path.join(__dirname, 'Database', 'database.json');

// __dirname is an environment variable that tells
// you the absolute path of the directory containing
// the currently executing file
// It will help look for pug files
const VIEWS_PATH = path.join(__dirname, 'Views');

// define a schema (i.e. a JSON object) for the database.
const schema = {
  users: []
};

//providing database connection
global.db = fsdb(DB_PATH, schema);

// use pug to render all videos
app.set('view engine', 'pug');
app.set('views', VIEWS_PATH);

//css file is stored in resource folder.
app.use('/resource', express.static('Resources'));

//registers the middleware
app.use(express.json());

//This line of code is configuring middleware
//in an Express application to parse requests
//with a URL-encoded format. The express.urlencoded
//middleware is used to parse this data when the server receives it.
app.use(express.urlencoded({ extended: true }));

// Register the 'session' middleware.
app.use(middlewareSession);

//Routes
app.use('/auth', apiRoutes);
app.use('/video', videoRoutes);


//Start a server
app.listen(3000, function () {
    console.log('Service running on port 3000!');
});

//Implement error handling, including for critical parts like starting the server.
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

