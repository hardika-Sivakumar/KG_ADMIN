const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const { CONFIG } = require("./config");
const {getStudentDetails} = require("./services/studentService");
const {getStaffDetails} = require("./services/staffService");
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
app.get("/add_staff", async (req, res) => {
    return res.render('add-staff');
})
app.get("/add_event", async (req, res) => {
    return res.render('add-event');
})

app.get("/student_lists",async (req, res) => {
    const headers={
        'content-type':'application/json'
    }
    const studentList=await getStudentDetails(headers,{
        get_all:true
    });
    if(!studentList.success){
        //handle 500 server error
        return
    }
    return res.render('student-list',{studentData:studentList?.students});
})

app.get("/student_details",async (req, res) => {
    const studentId=req.query.studentID
    const headers={
        'content-type':'application/json'
    }
    const studentData=await getStudentDetails(headers,{
        filters:{
        student_id:studentId
        }
    })
    console.log(studentData)
    if(!studentData.success){
        //handle 500 server error
        return
    }
    return res.render('student-details',{studentDetails:studentData?.students?.[0]});
})


app.get("/staff_lists",async (req, res) => {
    const headers={
        'content-type':'application/json'
    }
    const staffList=await getStaffDetails(headers,{
        get_all:true
    });
    console.log(staffList)
    if(!staffList.success){
        //handle 500 server error
        return
    }
    return res.render('staff-list',{staffData:staffList?.staffs});
})

app.locals.BACKEND_URL = CONFIG?.BACKEND_URL

app.listen(CONFIG.PORT, () => {
    console.log(`Server is running at http://localhost:${CONFIG.PORT}`);

});