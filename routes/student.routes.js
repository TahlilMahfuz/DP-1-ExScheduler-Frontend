const express = require('express');
const router = express.Router();
const {
    getstudentlogin,
    studentLogin,
    getstudentdashboard
} = require('../controllers/student.controllers');

router.get('/student/studentlogin', getstudentlogin);
router.get('/student/dashboard', getstudentdashboard);

router.post('/student/studentlogin', studentLogin);


module.exports = router;
