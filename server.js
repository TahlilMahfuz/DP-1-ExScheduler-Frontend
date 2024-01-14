const express=require("express");
const app = express();
const bcrypt=require("bcrypt");
const session=require("express-session");
const flash=require("express-flash");
const passport=require('passport');
const initializeAdminPassport=require('./config/adminPassportConfig');
const initializeStudentPassport=require('./config/studentPassportConfig');
const qr=require('qrcode');
const fs=require('fs');
const cookieParser = require("cookie-parser");


initializeAdminPassport(passport);
initializeStudentPassport(passport);


require('dotenv').config()

const port=process.env.PORT || 3001;

app.set('view engine',"ejs");
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      save:true,
      saveUninitialized: true
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));



//add routes
const adminRouter = require("./routes/admin.routes");
app.use("/", adminRouter);
const studentRouter = require("./routes/student.routes");
app.use("/", studentRouter);




app.listen(port, () =>{
    console.log(`Server listening port http://localhost:${port}`);
})