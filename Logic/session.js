const express = require( "express");

// Module to handle sessions
const session = require('express-session');
const app = express();

// Register the 'session' middleware. The middleware will append
// the session to the req object of every route (i.e. req.session)
const middlewareSession=(session({
    secret: "secretKey",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000 }}));

// To make the routes available we need to export the router object.
// now the router object can be imported by other modules in our applications.
module.exports = middlewareSession;

