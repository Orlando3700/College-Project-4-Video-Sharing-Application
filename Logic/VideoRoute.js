//initialize the use of the express library
const express = require('express');

// Get an instance of the Router() object
const router = express.Router();

// fs module allows us to access the file system.
const fs = require('fs').promises;
const path = require('path');
const db = require("./Database/fsdb");

//define a schema for the database
const dbSchema = {
    videos: []
};

//Path is a built-in Node.js module that provides
//utilities for working with file and directory paths.
//path.join() is a method that is used to join
//one or more path segments into a single path.
//process.cwd() returns the current working directory
//of the Node.js process.
const dbConnection = path.join(process.cwd(), 'Database', 'videoData.json');

global.db = db(dbConnection, dbSchema);

// Authentication middleware
const checkAuthentication = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        res.send('<script>alert("You must be logged in"); window.location.href = "/auth/login";</script>');
    } else {
        next();
    }
};

// Register the route to the router object instance
// Before showing the content, check is user is authenticated
// and restrict access if not logged in.
router.get('/dashboard', checkAuthentication, async (req, res) => {
    try {
        const rawData = await fs.readFile(dbConnection, 'utf-8');
        const newVideos = JSON.parse(rawData);

        res.render('dashboard.pug', {
            video: newVideos,
            isAuthenticated: req.session.isAuthenticated,
            username: req.session.userID
        });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/newVideo', checkAuthentication, (req, res) => {
    res.render('videoView.pug', {
    });
});

router.post('/newVideo', checkAuthentication, (req, res) => {
    res.render('videoView.pug', {
    });

    const { URL, title } = req.body;
    const newVideo = {
        url: URL,
        username: req.session.userID,
    };

    db.model.videos.push(newVideo);
    db.update();
});

router.get('/database', (req, res) => {
    res.json({ videos: db.model.videos });
});

// To make the routes available we need to export the router object.
// now the router object can be imported by other modules in our applications.
module.exports = router;

