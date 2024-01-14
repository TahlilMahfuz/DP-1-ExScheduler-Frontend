const bcrypt = require('bcrypt');
const passport = require('passport');
const axios = require('axios');
const https = require('https');

const getstudentlogin = (req, res) => {
    res.render('student/studentlogin');
};

const studentLogin = passport.authenticate('student', {
    successRedirect: '/student/dashboard',
    failureRedirect: 'student/studentlogin',
    failureFlash: true,
});

const getstudentdashboard = (req, res) => {
    res.render('student/dashboard');
}


module.exports = {
    getstudentlogin,
    studentLogin,
    getstudentdashboard
};