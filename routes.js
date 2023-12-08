// In this file, we group routes together using the Router object.

// Get an instance of the Router() object
const express = require('express')
const router = express.Router()

// Register two routes to the router object instance
router.get('/welcome', function (req, res){
req.send( 'Welcome new user!')
})

router.get('/goodbye', function (req, res){
req.send( 'Thank you for visiting the page! See you again soon');
})

// To make the routes available we need to export the router object.
// now the router object can be imported by other modules in our applications.
module. exports = router
