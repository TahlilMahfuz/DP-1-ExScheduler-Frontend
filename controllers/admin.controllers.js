const bcrypt = require("bcrypt");
const passport = require("passport");
const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getDashboard = (req, res) => {
  res.render("index");
};
const getAdminDashboard = (req, res) => {
  console.log(req.user);
  res.render("admin/admindashboard");
};
const getadminlogin = (req, res) => {
  res.render("admin/adminlogin");
};
const getadminsignup = (req, res) => {
  res.render("admin/adminsignup");
}
const getProgramSemester=(req,res)=>{
  res.render("admin/add-program-semester");
}
const getAddExamSchedule=(req,res)=>{
  res.render("admin/add-exam-schedule");
}
const getAddCourse=(req,res)=>{
  res.render("admin/add-course");
}
const getaddlink=(req,res)=>{
  res.render("admin/add-link");
}
const getadddepartment=(req,res)=>{
  res.render("admin/add-department");
}

const getLinkedCoursesWithoutPriority = async (req, res) => {
  try {
    const apiresponse = await axios.get(
      "https://localhost:7227/api/Admin/getLinkedCoursesWithoutPriority",
      { httpsAgent: agent }
    );
    res.json(apiresponse.data.info);
  } catch (err) {
    console.error(err.message);
  }
};

const adminLogin = passport.authenticate("admin", {
  successRedirect: "/admin/admindashboard",
  failureRedirect: "adminlogin",
  failureFlash: true
});

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("jwtToken");
};

const getadmins = async (req, res) => {
  try {
    const apiResponse = await axios.get(
      "https://localhost:7227/api/Admin/getadmins",
      {
        httpsAgent: agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(apiResponse.data);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getDashboard,
  getAdminDashboard,
  getLinkedCoursesWithoutPriority,
  getadmins,
  adminLogin,
  getadminlogin,
  getadminsignup,
  getProgramSemester,
  getAddExamSchedule,
  getAddCourse,
  getaddlink,
  getadddepartment
};
