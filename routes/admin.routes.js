const express = require('express');
const router = express.Router();
const{
    getDashboard,
    getLinkedCoursesWithoutPriority,
    getadmins,
    adminLogin,
    getadminlogin,
    getadminsignup,
    getAdminDashboard
} = require('../controllers/admin.controllers');

router.get("/", getDashboard);
router.get("/admin/adminlogin",getadminlogin);
router.get("/admin/adminsignup",getadminsignup);
router.get('/api/Admin/getLinkedCoursesWithoutPriority', getLinkedCoursesWithoutPriority);
router.get('/api/Admin/getadmins', getadmins);
router.get('/admin/admindashboard', getAdminDashboard);
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


module.exports = router;