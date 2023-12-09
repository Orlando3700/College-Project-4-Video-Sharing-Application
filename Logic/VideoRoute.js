//initialize the use of the express library
var express = require('express');

// Get an instance of the Router() object
var router = express.Router();

// fs module allows us to access the file system.
const fs = require('fs');
let newInfo = fs.readFileSync('./Database/videoDB.json');
let videos = JSON.parse(newInfo);

const path = require('path');

//Path is a built-in Node.js module that provides
//utilities for working with file and directory paths.
//path.join() is a method that is used to join
//one or more path segments into a single path.
//process.cwd() returns the current working directory
//of the Node.js process.
const db_conn = path.join(process.cwd(), 'Database', 'videoData.json');

//define a schema for the database
db_schema = {    videos: []
}

global.db = require("./Database/fsdb")(db_conn, db_schema);

// Register the route to the router object instance
router.get('/dashboard', (req, res) => {

let rawData = fs.readFileSync('./Database/videoData.json');
let newVideos = JSON.parse(rawData);
const path = require('path');
const db_connection = path.join(process.cwd(), 'Database', 'videoData.json');

//define a schema for the database
db_schema = {    videos: []
}

// Before showing the content, check is user is authenticated
// and restrict access if not logged in.
global.db = require("../Database/fsdb")(db_conn1, db_schema);
    if (!req.session.isAuthenticated) {
        res.send('<script>alert("You must be logged in"); res.redirect = "/auth/login";</script>');
    } else {
	
        res.render('dashboard.pug', {
            title: 'FIFA',
            video: newVideos,
            isAuthenticated: req.session.isAuthenticated,
            username: req.session.userID
        });
    }
    
});

router.get('/addvideo', (req,res)=>{
    if (!req.session.isAuthenticated) {
        res.send('<script>alert("You must be logged in"); res.redirect = "/auth/login";</script>');
    } else { 
	
    res.render('newVideoData.pug', {
        title: "FIFA"
    });
}})

router.post('/addvideo', (req,res)=>{
    res.render('newVideoForm.pug',{
    title: "FIFA"});

    const {URL, title} = req.body;

    addvideo = {
        url : URL,
        title: title,
        username: req.session.userID,
    }
db.model.videos.push(new_video);
    db.update();
 });   

router.get('/database', (req, res) =>{
    res.json({videos: db.model.videos});
})

// To make the routes available we need to export the router object.
// now the router object can be imported by other modules in our applications.
module.exports = router

