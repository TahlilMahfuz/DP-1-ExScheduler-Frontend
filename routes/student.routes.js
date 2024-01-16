const express = require('express');
const router = express.Router();
const {
    getstudentlogin,
    studentLogin,
    getstudentdashboard,
    getstudentfinalpreference,
    getstudentsignup,
    studentsignup,
    submitfinalpreference,
} = require('../controllers/student.controllers');

router.get('/student/studentlogin', getstudentlogin);
router.get('/student/studentsignup', getstudentsignup);
router.get('/student/dashboard', getstudentdashboard);
router.get('/student/studentfinalpreference', getstudentfinalpreference);

router.post('/student/studentlogin', studentLogin);
router.post('/student/studentsignup', studentsignup);
router.post('/student/submitfinalpreference', submitfinalpreference);


module.exports = router;
