const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const { CONFIG } = require("./config");
const { getStudentDetails } = require("./services/studentService");
const { getStaffDetails } = require("./services/staffService");
const { getEventDetails } = require("./services/eventService");
const { getGalleryDetails } = require("./services/galleryService");
const { getSettingDetails } = require("./services/settingService");
const { getContactDetails } = require("./services/contactService");
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

app.get("/student_lists", async (req, res) => {
    const headers = {
        'content-type': 'application/json'
    }
    const studentList = await getStudentDetails(headers, {
        get_all: true
    });
    if (!studentList.success) {    //handle 500 server error
        return
    }
    return res.render('student-list', { studentData: studentList?.students });
})

app.get("/student_details", async (req, res) => {
    const studentId = req.query.studentID
    const headers = {
        'content-type': 'application/json'
    }
    const studentData = await getStudentDetails(headers, {
        filters: {
            student_id: studentId
        }
    })
    console.log(studentData)
    if (!studentData.success) {
        //handle 500 server error
        return
    }
    return res.render('student-details', { studentDetails: studentData?.students?.[0] });
})


app.get("/staff_lists", async (req, res) => {
    const headers = {
        'content-type': 'application/json'
    }
    const staffList = await getStaffDetails(headers, {
        get_all: true
    });
    if (!staffList.success) {
        //handle 500 server error
        return
    }
    return res.render('staff-list', { staffData: staffList?.staffs });
})

app.get("/gallery", async (req, res) => {
    const galleryData = await getGalleryDetails();
    console.log(galleryData)
    if (!galleryData.success) {
        //handle 500 server error
        return
    }
    return res.render('gallery', { galleryData: galleryData?.gallery });
})

app.get("/event_lists", async (req, res) => {
    const headers = {
        'content-type': 'application/json'
    }
    const eventList = await getEventDetails(headers, {
        get_all: true
    });
    console.log(eventList)
    if (!eventList.success) {
        //handle 500 server error
        return
    }
    return res.render('event-list', { eventData: eventList?.events });
})

app.get("/contact_list",async (req, res) => {
    const contactList = await getContactDetails();
    if(!contactList.success){
        //handle 500 server error
        return
    }
    return res.render('contact-list', { contactData: contactList?.contact ?? [] });
})


app.get("/website_settings",async (req, res) => {
    const headers = {
        'content-type': 'application/json'
    }
    const settingList = await getSettingDetails(headers);
    const selectedEvent=settingList?.setting?.filter(setting=>setting.type==="event_info")
    const selectedStaff=settingList?.setting?.filter(setting=>setting.type==="staff_info")

    const eventList = await getEventDetails(headers,{get_all: true});

    eventList?.events?.map((event)=>{
        if(selectedEvent?.[0]?.event_ids?.includes(event.event_id)){
            event.selected=true
        }
    })
    console.log(eventList)
    const staffList = await getStaffDetails(headers,{get_all: true});

    staffList?.staffs?.map((staff)=>{
        if(selectedStaff?.[0]?.staff_ids?.includes(staff?.staff_id)){
            staff.selected=true
        }
    })
    console.log(eventList,staffList,settingList)
    return res.render('website-settings',{settingDetails:settingList?.setting ?? [],eventDetails:eventList?.events ?? [],staffDetails:staffList?.staffs ?? [],eventSettingId:selectedEvent?.[0]?.setting_id,staffSettingId:selectedStaff?.[0]?.setting_id});
})

app.locals.BACKEND_URL = CONFIG?.BACKEND_URL

app.listen(CONFIG.PORT, () => {
    console.log(`Server is running at http://localhost:${CONFIG.PORT}`);

});