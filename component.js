const User = require('../models/User');

exports.getRegisterPage = (req, res) => {
  res.render('auth/register');
};

exports.registerUser = (req, res) => {
  // Handle registration logic and create user
  // Go to login page if successful
  // or back to register page with error
};

exports.getLoginPage = (req, res) => {
  res.render('auth/login');
};

exports.loginUser = (req, res) => {
  // Handle login logic and create session
  // Go directly to video list if success, or go back to
  // login page with error if it fails
};