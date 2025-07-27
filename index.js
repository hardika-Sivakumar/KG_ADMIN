const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const { CONFIG } = require("./config");
const { getStudentDetails } = require("./services/studentService");
const { getStaffDetails } = require("./services/staffService");
const { getEventDetails } = require("./services/eventService");
const { getGalleryDetails } = require("./services/galleryService");
const { getSettingDetails } = require("./services/settingService");
const { getContactDetails } = require("./services/contactService");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ""));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "")));

app.get("/", async (req, res) => {
  return res.render("index");
});
app.get("/add_student", async (req, res) => {
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
  console.log(studentDetails?.students?.[0]);

  return res.render("add-student", { studentDetails: studentDetails ?? {} });
});
app.get("/add_staff", async (req, res) => {
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
app.get("/add_event", async (req, res) => {
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
    console.log(eventData)
    if (!eventData.success) {
      //handle 500 server error
      return;
    }
    eventDetails = eventData?.events?.[0];
  }
  console.log(eventDetails)
  return res.render("add-event",{eventDetails:eventDetails ?? {}});
});

app.get("/login", async (req, res) => {
  return res.render("login-2");
});

app.get("/student_lists", async (req, res) => {
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

app.get("/student_details", async (req, res) => {
  const studentId = req.query.studentID;
  const headers = {
    "content-type": "application/json",
  };
  const studentData = await getStudentDetails(headers, {
    filters: {
      student_id: studentId,
    },
  });
  console.log(studentData);
  if (!studentData.success) {
    //handle 500 server error
    return;
  }
  return res.render("student-details", {
    studentDetails: studentData?.students?.[0],
  });
});

app.get("/staff_lists", async (req, res) => {
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

app.get("/gallery", async (req, res) => {
  const galleryData = await getGalleryDetails();
  console.log(galleryData);
  if (!galleryData.success) {
    //handle 500 server error
    return;
  }
  return res.render("gallery", { galleryData: galleryData?.gallery });
});

app.get("/event_lists", async (req, res) => {
  const headers = {
    "content-type": "application/json",
  };
  const eventList = await getEventDetails(headers, {
    get_all: true,
  });
  console.log(eventList);
  if (!eventList.success) {
    //handle 500 server error
    return;
  }
  return res.render("event-list", { eventData: eventList?.events });
});

app.get("/contact_list", async (req, res) => {
  const contactList = await getContactDetails();
  if (!contactList.success) {
    //handle 500 server error
    return;
  }
  return res.render("contact-list", {
    contactData: contactList?.contact ?? [],
  });
});

app.get("/website_settings", async (req, res) => {
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
  console.log(eventList);
  const staffList = await getStaffDetails(headers, { get_all: true });

  staffList?.staffs?.map((staff) => {
    if (selectedStaff?.[0]?.staff_ids?.includes(staff?.staff_id)) {
      staff.selected = true;
    }
  });
  console.log(eventList, staffList, settingList);
  return res.render("website-settings", {
    settingDetails: settingList?.setting ?? [],
    eventDetails: eventList?.events ?? [],
    staffDetails: staffList?.staffs ?? [],
    eventSettingId: selectedEvent?.[0]?.setting_id,
    staffSettingId: selectedStaff?.[0]?.setting_id,
  });
});

app.locals.BACKEND_URL = CONFIG?.BACKEND_URL;

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running at http://localhost:${CONFIG.PORT}`);
});
