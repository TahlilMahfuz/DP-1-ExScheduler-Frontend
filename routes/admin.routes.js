const express = require('express');
const router = express.Router();
const{
    getDashboard,
    getLinkedCoursesWithoutPriority,
    getadmins,
    adminLogin,
    getadminlogin,
    getadminsignup,
    getAdminDashboard,
    getProgramSemester,
    getAddExamSchedule,
    getAddCourse,
    getaddlink,
    getadddepartment,
    adddepartment,
    addprogramsemester,
    addexamschedule,
    addcourse,
    addlink,
    fetchRoutine
} = require('../controllers/admin.controllers');

router.get("/", getDashboard);
router.get("/admin/adminlogin",getadminlogin);
router.get("/admin/adminsignup",getadminsignup);
router.get('/api/Admin/getLinkedCoursesWithoutPriority', getLinkedCoursesWithoutPriority);
router.get('/api/Admin/getadmins', getadmins);
router.get('/admin/admindashboard', getAdminDashboard);
router.get('/add-program-semester', getProgramSemester);   
router.get('/add-exam-schedule', getAddExamSchedule); 
router.get('/add-course', getAddCourse);
router.get('/add-link',getaddlink);
router.get('/add-department',getadddepartment);
router.get('/fetch-routine', fetchRoutine);



router.get('/userlogout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log('User logged out');
        }
    });
    res.redirect('/admin/adminlogin');
});



router.post('/admin/adminlogin', adminLogin);
router.post('/admin/adddepartment',adddepartment);
router.post('/admin/addprogramsemester',addprogramsemester);
router.post('/admin/addexamschedule',addexamschedule);
router.post('/admin/addcourse',addcourse);
router.post('/admin/addlink',addlink)

module.exports = router;