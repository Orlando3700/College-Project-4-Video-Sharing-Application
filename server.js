//The entry point of your application should be a file named
//‘server.js’. Therefore, your application would execute by issuing the command ‘node
//server.js’

const express = require( "express");
// Module to handle sessions in node.js
// Node: must install using: npm install express-session
const session = require( 'express-session');
const app = express();

// Register the 'session' middleware. The middleware will append
//the session to the req object of every route (i.e. req.session)
app.use (session( {
secret: 'SomeSecretCode##LoadFromEnviromentVariable', 
saveUninitialized: true, 
resave: false,
cookie: { maxAge: 60000 }})
)

// Routes
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
app.use('/auth', authRoutes);
app.use('/video', videoRoutes);


// Simulate a database connection with user credentials
global. db = {
user : {
username : "tom", 
passcode: "CUS1172"
}
};
// User need to authenticate.
// Typically user credentials should be passed through a secure POST request
app. get('/login/:user/:passcode', (req, res) => {
const { user, passcode} = req.params; // deconstruct dictionary

// if passcode and username matches.
if ((db.user.username == user) && (db.user. passcode == passcode)){
// Notice that we have access to the session
// via the req. session object.
req. session.userID = user;
req.session.isAuthenticated = true;
res.send( `Hi ${req.session.userID}, I will remember you` );
}
});
// Logout
app.get('/logout', (req, res) => {
req.session.destroy((err) => {
if (err){
console.log(err);
res.send (err)
} else {
res. send( "You are logged out!");
}
});
});
// Protected route - This is just one way to protect the route.
// A better way, is to use a middleware to restrict access.
app. get('/private', (req, res)=>{
// Before showing the content, check is user is authenticated
// and restrict access if not logged in.
if (!req.session.isAuthenticated) {

res.send("I do not know who you are? "); 
return;
}
// User is logged in, so show the private content.
res.send(`Hi ${req.session.userID}, You can see the private content`  );
});

//Start a server
app.listen(3000,()=>{
console.log("Server is running on port 3000");
});

