const bcrypt = require("bcrypt");
const passport = require("passport");
const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const getstudentlogin = (req, res) => {
    res.render("student/studentlogin");
};

const studentLogin = passport.authenticate("student", {
    successRedirect: "/student/dashboard",
    failureRedirect: "student/studentlogin",
    failureFlash: true,
});

const getstudentdashboard = (req, res) => {
    res.render("student/dashboard");
};

const getstudentfinalpreference = async (req, res) => {
    try {
        const apiResponse = await axios.get(
            "https://localhost:7227/api/Student/GetCourses",
            {
                httpsAgent: agent,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${req.user.token}`,
                },
            }
        );
        console.log(apiResponse.data.info);
        const courses = apiResponse.data.info;

        const apiResponse1 = await axios.get(
            "https://localhost:7227/api/Student/GetExamDates",
            {
                httpsAgent: agent,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${req.user.token}`,
                },
            }
        );
        console.log(apiResponse1.data.info);
        const coursesWithDates = apiResponse1.data.info;
        console.log(coursesWithDates);
        const combinedCourses = courses.map((course) => ({
            courseName: course,
            examDate:
                (coursesWithDates.find((cd) => cd.courseName === course) || {})
                    .examDate || null,
        }));

        res.render("student/studentfinalpreference", { courses: combinedCourses });
    } catch (err) {
        console.error(err.message);
    }
};


const submitfinalpreference = async (req, res) => {
    try {
        const { courses, dates } = req.body;
        console.log(courses, dates);
        let formattedData = [];
        if(Array.isArray(courses)) {
        // Assuming courses and dates are arrays of strings
            formattedData = courses.map((courseName, index) => ({
                examDate: dates[index],
                courseName: courseName,
            }));
        }
        else {
            formattedData = [{
                examDate: dates,
                courseName: courses,
            }];
        }
        // Log the formatted data for verification
        console.log(formattedData);
        // res.json(formattedData);
        const apiResponse = await axios.post(
            "https://localhost:7227/api/Student/PostStudentPreferences",
            formattedData,
            {
                httpsAgent: agent,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${req.user.token}`,
                },
            }
        );

        console.log(apiResponse.data.info);

        if (apiResponse.data.info === "Student preferences added successfully") {
            let no_err = [{ message: apiResponse.data.info }];
            res.render("student/dashboard", { no_err });
        } else {
            let error = [{ message: apiResponse.data.info }];
            res.render("student/dashboard", { error });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getstudentsignup = (req, res) => {
    res.render("student/studentsignup");
};

const studentsignup = async (req, res) => {
    const {
        studentid,
        studentname,
        studentemail,
        programsemester,
        studentpassword,
        cstudentpassword,
    } = req.body;
    console.log(
        studentid,
        studentname,
        studentemail,
        programsemester,
        studentpassword,
        cstudentpassword
    );
    try {
        const apiResponse = await axios.post(
            "https://localhost:7227/api/Student/CRSignup",
            {
                studentId: studentid,
                studentName: studentname,
                studentEmail: studentemail,
                programeSemester: programsemester,
                studentPassword: studentpassword,
                studentConfirmPassword: cstudentpassword,
                salt: "string",
            },
            {
                httpsAgent: agent,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(apiResponse.data.message);
        if (apiResponse.data.message == "Request sent to admin") {
            let no_err = [];
            no_err.push({ message: apiResponse.data.message });
            res.render("student/studentsignup", { no_err });
        } else {
            let error = [];
            error.push({ message: apiResponse.data.message });
            res.render("student/studentsignup", { error });
        }
    } catch (err) {
        console.error(err.message);
    }
};
module.exports = {
    getstudentlogin,
    studentLogin,
    getstudentdashboard,
    getstudentfinalpreference,
    getstudentsignup,
    studentsignup,
    submitfinalpreference,
};
