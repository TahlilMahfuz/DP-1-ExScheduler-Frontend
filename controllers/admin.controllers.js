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

const adddepartment = async (req, res) => {
  let department=req.body.department;
  console.log(department);
  try {
    const apiResponse = await axios.post(
      "https://localhost:7227/api/Admin/adddepartment",
      {
        "departmentName": department,
      },
      {
        httpsAgent: agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.user.token}`,
        },
      }
    );
    // res.json(apiResponse.data);
    console.log(apiResponse.data.message);
    if(apiResponse.data.message=="Department added successfully")
    {
      let no_err= [];
      no_err.push({ message: apiResponse.data.message });
      res.render("admin/add-department", { no_err });
    }
    else{
      let error=[];
      error.push({message:apiResponse.data.message});
      res.render("admin/add-department",{error});
    }
  } catch (err) {
    console.error(err.message);
  }
}

const addprogramsemester = async (req, res) => {
  let programsemester=req.body.programsemester;
  let department=req.body.department;
  console.log(programsemester);
  console.log(department);
  try {
    const apiResponse = await axios.post(
      "https://localhost:7227/api/Admin/addprogrammesemester",
      {
        "programmeSemesterName": programsemester,
        "departmentName": department,
      },
      {
        httpsAgent: agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.user.token}`,
        },
      }
    );
    console.log(apiResponse.data.message);
    if(apiResponse.data.message=="ProgrammeSemester added successfully")
    {
      let no_err= [];
      no_err.push({ message: apiResponse.data.message });
      res.render("admin/add-program-semester", { no_err });
    }
    else{
      let error=[];
      error.push({message:apiResponse.data.message});
      res.render("admin/add-program-semester",{error});
    }
  } catch (err) {
    console.error(err.message);
  }
}

const addexamschedule = async (req, res) => {
  let examdate=req.body.examdate;
  console.log(examdate);
  try {
    const apiResponse = await axios.post(
      "https://localhost:7227/api/Admin/addexamschedule",
      {
        "examDate": examdate,
      },
      {
        httpsAgent: agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.user.token}`,
        },
      }
    );
    console.log(apiResponse.data.message);
    if(apiResponse.data.message=="ExamSchedule added successfully")
    {
      let no_err= [];
      no_err.push({ message: apiResponse.data.message });
      res.render("admin/add-exam-schedule", { no_err });
    }
    else{
      let error=[];
      error.push({message:apiResponse.data.message});
      res.render("admin/add-exam-schedule",{error});
    }
  } catch (err) {
    console.error(err.message);
  }
}

const addcourse = async(req,res)=>{
  let programsemester=req.body.programsemester;
  let course=req.body.course;
  console.log(programsemester);
  console.log(course);
  try{
    const apiResponse = await axios.post(
      "https://localhost:7227/api/Admin/addcourse",
      {
        "courseName": course,
        "programSemesterName": programsemester
      },
      {
        httpsAgent: agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.user.token}`,
        },
      }
    );
    console.log(apiResponse.data.message);
    if(apiResponse.data.message=="Course added successfully")
    {
      let no_err= [];
      no_err.push({ message: apiResponse.data.message });
      res.render("admin/add-course", { no_err });
    }
    else{
      let error=[];
      error.push({message:apiResponse.data.message});
      res.render("admin/add-course",{error});
    }
  } catch (err) {
    console.error(err.message);
  }
}

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
  getadddepartment,
  adddepartment,
  addprogramsemester,
  addexamschedule,
  addcourse
};
