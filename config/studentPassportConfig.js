const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function initialize(passport) {
  console.log("Student Passport Config Started");
  console.log("Initialized");

  const authenticateStudent = async (email, password, done) => {
    console.log("Student email: " + email);
    console.log("Student password: " + password);

    let error = [];
    try {
      const response = await axios.post(
        'https://localhost:7227/api/Student/CRLogin',
        {
          "studentEmail": email,
          "studentPassword": password
        },
        {
          httpsAgent: agent,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check response status
      if (response.status == 200) {
        console.log("Student Login Successful");
        console.log(response.data);
        let token = response.data.token;
        return done(null, {token});
      } else {
        console.log("Student Login Failed");
        error.push({ message: "Incorrect Password" });
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      console.error("Error during Student authentication:", err);
      return done(err);
    }
  };

  passport.use(
    'student',
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateStudent
    )
  );
  passport.serializeUser((token, done) => done(null, token));

  passport.deserializeUser((token, done) => {
    return done(null, token);
  });
}

module.exports = initialize;
