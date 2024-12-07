import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import StudentComponet from "./components/StudentComponent";
// import TeacherComponent from "./components/TeacherComponent";
// import ClassComponent from "./components/ClassComponent";
// import LoginPage from "./components/Login/LoginPage.jsx";
import AdminLoginForm from "./components/Login/AdminLoginForm.jsx";
import TeacherLoginForm from "./components/Login/TeacherLoginForm.jsx";
import StudentLoginForm from "./components/Login/StudentLoginForm.jsx";

import SignupPage from "./components/Signup/SignupPage.jsx";
import SchoolLandingPage from "./components/LandingPages/SchoolLandingPage.jsx";
import StudentLandingPage from "./components/LandingPages/StudentLandingPage.jsx";
import ViewClassDetails from "./components/DetailsPages/ViewClassDetails.jsx";
import ViewMarks from "./components/DetailsPages/ViewMarks.jsx";
import TeacherLandingPage from "./components/LandingPages/TeacherLandingPage.jsx";
import AdminDashboard from "./components/LandingPages/AdminDashboard.jsx";
import Reports from "./components/DetailsPages/Reports.jsx";
import ManageClasses from "./components/DetailsPages/ManageClasses.jsx";
import ManageStudents from "./components/DetailsPages/ManageStudents.jsx";
import ManageTeachers from "./components/DetailsPages/ManageTeachers";
import TeacherManageClasses from "./components/DetailsPages/TeacherManageClasses.jsx";

function App() {

  return (
    <>
      {/* <StudentComponet/>
      <TeacherComponent/>
      <ClassComponent/>
      <Login/> */}

      <Router>
        <Routes>
          <Route path="/" element={<SchoolLandingPage />} />
          <Route path="/login/admin" element={<AdminLoginForm />} />
          <Route path="/login/teacher" element={<TeacherLoginForm />} />
          <Route path="/login/student" element={<StudentLoginForm />} />


          <Route
            path="/signup/admin"
            element={<SignupPage userType="admin" />}
          />
          <Route
            path="/signup/teacher"
            element={<SignupPage userType="teacher" />}
          />
          <Route
            path="/signup/student"
            element={<SignupPage userType="student" />}
          />
          <Route path="/student-dashboard" element={<StudentLandingPage />} />

          <Route path="/view-class-details" element={<ViewClassDetails />} />
          <Route path="/view-marks" element={<ViewMarks />} />

          <Route path="/teacher-dashboard" element={<TeacherLandingPage />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<Reports />} />

          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/teachers" element={<ManageTeachers />} />

          <Route path="/teacher/classes" element={<TeacherManageClasses/>}/>

          {/* <Route path="/manage-classes" element={<ManageClasses />} />
        <Route path="/student-performance" element={<StudentPerformance />} />
        <Route path="/profile" element={<TeacherProfile />} /> */}
        
        </Routes>
      </Router>
    </>
  );
}

export default App;
