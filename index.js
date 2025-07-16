const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const { CONFIG } = require("./config");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, ''));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '')));


app.get("/", async (req, res) => {
    return res.render('index');
})
app.get("/add_student", async (req, res) => {
    return res.render('add-student');
})
app.get("/add_teacher", async (req, res) => {
    return res.render('add-teacher');
})
app.get("/add_event", async (req, res) => {
    return res.render('add-event');
})

app.get("/student_lists",async (req, res) => {
    return res.render('student-list');
})

app.get("/student_details",async (req, res) => {
    const studentId=req.query.studentID
    console.log(studentId)
    return res.render('student-details');
})

app.locals.BACKEND_URL = CONFIG?.BACKEND_URL

app.listen(CONFIG.PORT, () => {
    console.log(`Server is running at http://localhost:${CONFIG.PORT}`);

});