const express = require("express");
const path = require("path");
const app = express();
const sessionMiddleware = require('./middlewares/session');
const {  requireTeacher, requireAdmin,requireAdminOrTeacher } = require('./middlewares/auth');
const { CONFIG } = require("./config");
const { getStudentDetails } = require("./services/studentService");
const { getStaffDetails } = require("./services/staffService");
const { getEventDetails } = require("./services/eventService");
const { getGalleryDetails } = require("./services/galleryService");
const { getSettingDetails } = require("./services/settingService");
const { getContactDetails } = require("./services/contactService");
const {validateCreds}=require('./services/authService')

app.set("view engine", "ejs");
app.set("views", __dirname);
app.use('/assets', express.static(path.join(__dirname, "assets")));
app.use('/locales', express.static(path.join(__dirname, "locales"))); 
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(express.json());


app.use((req, res, next) => {
  res.locals.role = req.session?.role ;
  next();
});

app.get("/", async (req, res) => {
  const headers = {
    "content-type": "application/json",
  }
  const settingDetails = await getSettingDetails(headers);

  const galleryDetails = await getGalleryDetails(headers);

  if (!galleryDetails?.success) {
    //handle error
    return
  }

  if (!settingDetails?.success) {
    //handle error
    return
  }
  const carouselData = settingDetails?.setting?.filter((item) => item.type === "home_carousel")
  const eventData = settingDetails?.setting?.filter((item) => item.type === "event_info")
  const staffData = settingDetails?.setting?.filter((item) => item.type === "staff_info")
  const testimonialData = settingDetails?.setting?.filter((item) => item.type === "testimonial")
  let eventDetails = []
  let staffDetails = []
  if (eventData?.length > 0) {
    const payload = {
      filters: {
        event_id: eventData[0].event_ids
      },
      get_all: true
    }
    const events = await getEventDetails(headers, payload);
    if (!events?.success) {
      //handle error
      return
    }
    eventDetails = events?.events
  }

  if (staffData?.length > 0) {
    const payload = {
      filters: {
        staff_id: staffData[0].staff_ids
      },
      get_all: true
    }
    const staff = await getStaffDetails(headers, payload);
    if (!staff?.success) {
      //handle error
      return
    }
    staffDetails = staff?.staffs
  }

  return res.render("home", { carouselData: carouselData || [], eventDetails: eventDetails || [], staffDetails: staffDetails || [], galleryDetails: galleryDetails?.gallery || [] ,testimonialData: testimonialData || [] });
});


app.get("/admin",requireAdminOrTeacher, async (req, res) => {
  return res.render("index");
});
app.get("/add_student", requireAdminOrTeacher, async (req, res) => {
  const studentId = req.query.studentID;
  let studentDetails = {};
  if (studentId) {
    const headers = {
      "content-type": "application/json",
    };
    const studentData = await getStudentDetails(headers, {
      filters: {
        student_id: studentId,
      },
    });
    if (!studentData.success) {
      //handle 500 server error
      return;
    }
    studentDetails = studentData?.students?.[0];
  }

  return res.render("add-student", { studentDetails: studentDetails ?? {},studentId:studentId ?? "" });
});
app.get("/add_staff", requireAdmin,async (req, res) => {
  const staffId = req.query.staffID;
  let staffDetails = {};
  if (staffId) {
    const headers = {
      "content-type": "application/json",
    };
    const staffData = await getStaffDetails(headers, {
      filters: {
        staff_id: staffId,
      },
    });
    if (!staffData.success) {
      //handle 500 server error
      return;
    }
    staffDetails = staffData?.staffs?.[0];
  }
  return res.render("add-staff", { staffDetails: staffDetails ?? {} });
});
app.get("/add_event",requireAdminOrTeacher, async (req, res) => {
  const eventId = req.query.eventID;
  let eventDetails={}
  if (eventId) {
    const headers = {
      "content-type": "application/json",
    };
    const eventData = await getEventDetails(headers, {
      filters: {
        event_id: eventId,
      },
    });
    if (!eventData.success) {
      //handle 500 server error
      return;
    }
    eventDetails = eventData?.events?.[0];
  }
  return res.render("add-event",{eventDetails:eventDetails ?? {},eventId:eventId ?? ""});
});
app.post("/login", async (req, res) => {
  const { email, password, login_type } = req.body;
  const headers = {
    "content-type": "application/json",
  };
  const loginData = await validateCreds({ email, password, login_type }, headers);
  if (!loginData.success) {
    //handle 500 server error
    return res.redirect("/login");
  }
  req.session.user = email;
  req.session.role = loginData?.login_type;
  return res.redirect("/admin");
});

app.get("/login", async (req, res) => {
  if(req.session.user){
    return res.redirect("/admin");
  } 

  return res.render("login");
});

app.get("/student_lists",requireAdminOrTeacher, async (req, res) => {
  const headers = {
    "content-type": "application/json",
  };
  const studentList = await getStudentDetails(headers, {
    get_all: true,
  });
  if (!studentList.success) {
    //handle 500 server error
    return;
  }
  return res.render("student-list", { studentData: studentList?.students });
});

app.get("/student_details",requireAdminOrTeacher, async (req, res) => {
  const studentId = req.query.studentID;
  const headers = {
    "content-type": "application/json",
  };
  const studentData = await getStudentDetails(headers, {
    filters: {
      student_id: studentId,
    },
  });
  if (!studentData.success) {
    //handle 500 server error
    return;
  }
  return res.render("student-details", {
    studentDetails: studentData?.students?.[0],
  });
});

app.get("/staff_lists",requireAdmin, async (req, res) => {
  const headers = {
    "content-type": "application/json",
  };
  const staffList = await getStaffDetails(headers, {
    get_all: true,
  });
  if (!staffList.success) {
    //handle 500 server error
    return;
  }
  return res.render("staff-list", { staffData: staffList?.staffs });
});

app.get("/gallery",requireAdmin, async (req, res) => {
  const galleryData = await getGalleryDetails();
  if (!galleryData.success) {
    //handle 500 server error
    return;
  }
  return res.render("gallery", { galleryData: galleryData?.gallery });
});

app.get("/event_lists",requireAdminOrTeacher, async (req, res) => {
  const headers = {
    "content-type": "application/json",
  };
  const eventList = await getEventDetails(headers, {
    get_all: true,
  });
  if (!eventList.success) {
    //handle 500 server error
    return;
  }
  return res.render("event-list", { eventData: eventList?.events });
});

app.get("/contact_list",requireAdmin, async (req, res) => {
  const contactList = await getContactDetails();
  if (!contactList.success) {
    //handle 500 server error
    return;
  }
  return res.render("contact-list", {
    contactData: contactList?.contact ?? [],
  });
});

app.get("/website_settings",requireAdmin, async (req, res) => {
  const headers = {
    "content-type": "application/json",
  };
  const settingList = await getSettingDetails(headers);
  const selectedEvent = settingList?.setting?.filter(
    (setting) => setting.type === "event_info"
  );
  const selectedStaff = settingList?.setting?.filter(
    (setting) => setting.type === "staff_info"
  );

  const eventList = await getEventDetails(headers, { get_all: true });

  eventList?.events?.map((event) => {
    if (selectedEvent?.[0]?.event_ids?.includes(event.event_id)) {
      event.selected = true;
    }
  });
  const staffList = await getStaffDetails(headers, { get_all: true });

  staffList?.staffs?.map((staff) => {
    if (selectedStaff?.[0]?.staff_ids?.includes(staff?.staff_id)) {
      staff.selected = true;
    }
  });
  return res.render("website-settings", {
    settingDetails: settingList?.setting ?? [],
    eventDetails: eventList?.events ?? [],
    staffDetails: staffList?.staffs ?? [],
    eventSettingId: selectedEvent?.[0]?.setting_id,
    staffSettingId: selectedStaff?.[0]?.setting_id,
  });
});


app.get("/logout",async(req,res)=>{
  req.session.destroy();
  res.redirect("/login")
})

app.locals.BACKEND_URL = CONFIG?.BACKEND_URL;
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});
// app.listen(CONFIG.PORT, () => {
//   console.log(`Server is running at http://localhost:${CONFIG.PORT}`);
// });
module.exports = app;