const express = require('express');

// fs.promises is used for async file operations
const fs = require('fs').promises;
const path = require('path');

const dbPath = path.resolve(__dirname, 'Database', 'database.json');
const dbSchema = { users: [] };
global.db = require('../Database/fsdb')(dbPath, dbSchema);

const router = express.Router();

async function readDatabase() {
    try {
        const newData = await fs.readFile(dbPath, 'utf8');
        const user = JSON.parse(newData);

        console.log('users', user);
    } catch (error) {
        console.error('Error reading or parsing database:', error.message);
    }
}

readDatabase();

// Register the login route to the router object instance                             
router.get('/login', (req, res) => {
    const newView = {
        login_main: '/login',
    };
    res.render('login.pug', {
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = global.db.users.find(u => u.Username === username && u.Password === password);

    if (userData) {
        console.log("User is not available");
        return res.redirect('/auth/login?error=WrongSignIn');
    }

    console.log("User is available");
    console.log(user);

    req.session = req.session || {};
    req.session.userID = user.Username;
    req.session.userEmail = user.Email;
    req.session.isAuthenticated = true;

    console.log('New session');
    console.log('Session Data:', req.sessionID);

    res.redirect('/video/dashboard');
});

function renderLoginTemplate(req, res) {
    const { username, password } = req.session.loginInfo;
    res.render('login.pug', {
        username,
        password,
    });
}

router.get('/login', renderLoginTemplate);


router.get('/logout', (req, res) => {
    if (req.session.isAuthenticated) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                console.log("Session closed");
		// Create a logout.pug template
                res.render('logout.pug');
            }
        });
    } else {
	
		// Redirect to the login page if not authenticated
        res.redirect('/auth/login');
    }
});

//Signing in

const DatabaseHandler = require('../Database/fsdb');

// Read database
const dbPath = path.resolve(__dirname, 'Database', 'database.json');
const dbSchema = { users: [] };
const db = new DatabaseHandler(dbPath, dbSchema);

// Sign route
router.get('/sign', (req, res) => {
    res.render('sign.pug', {
    });
});

// Register form submission
router.post('/sign', async (req, res) => {
    const { name, username, password, email } = req.body;
    res.redirect(`/add/${name}/${username}/${password}/${email}`);
});

// Add user route
router.post('/add', async (req, res) => {
    try {
        const { name, username, password, email } = req.body;

        // Read existing users from the database
        const existingUsersData = await fs.readFile(dbPath, 'utf8');
        const existingUsers = JSON.parse(existingUsersData);

        // Create a new user
        const newUser = {
            Name: name,
            Username: username,
            Password: password,
            Email: email
        };

        // Add the new user to the existing users
        existingUsers.users.push(newUser);

        // Update the database
        await fs.writeFile(dbPath, JSON.stringify(existingUsers, null, 2));

        res.render('newAccount.pug');
    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

