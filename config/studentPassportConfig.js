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
      if (response.data.token == 'Sorry you are not authorized' || 
      response.data.token == 'Password is incorrect' || 
      response.data.token == 'Email does not exist') {
        console.log("Student Login Failed");
        error.push({ message: "Invalid Credentials" });
        return done(null, false, { message: "Invalid Credentials" });
        
      } else {
        console.log("Student Login Successful");
        console.log(response.data);
        let token = response.data.token;
        return done(null, {token});
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
