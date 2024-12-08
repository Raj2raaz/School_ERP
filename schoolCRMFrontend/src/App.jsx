import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLoginForm from "./components/Login/AdminLoginForm.jsx";
import TeacherLoginForm from "./components/Login/TeacherLoginForm.jsx";
import StudentLoginForm from "./components/Login/StudentLoginForm.jsx";

import SignupPage from "./components/Signup/SignupPage.jsx";

import SchoolLandingPage from "./components/LandingPages/SchoolLandingPage.jsx";
import AdminDashboard from "./components/LandingPages/AdminDashboard.jsx";
import StudentLandingPage from "./components/LandingPages/StudentLandingPage.jsx";
import TeacherLandingPage from "./components/LandingPages/TeacherLandingPage.jsx";

import ViewClassDetails from "./components/DetailsPages/ViewClassDetails.jsx";
import ViewMarks from "./components/DetailsPages/ViewMarks.jsx";
import Reports from "./components/DetailsPages/Reports.jsx";
import ManageClasses from "./components/DetailsPages/ManageClasses.jsx";
import ManageStudents from "./components/DetailsPages/ManageStudents.jsx";
import ManageTeachers from "./components/DetailsPages/ManageTeachers";
import TeacherManageClasses from "./components/DetailsPages/TeacherManageClasses.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SchoolLandingPage />} />

          <Route path="/login/admin" element={<AdminLoginForm />} />
          <Route path="/login/teacher" element={<TeacherLoginForm />} />
          <Route path="/login/student" element={<StudentLoginForm />} />

          <Route path="/signup/admin" element={<SignupPage userType="admin" />} />
          <Route path="/signup/teacher" element={<SignupPage userType="teacher" />} />
          <Route path="/signup/student" element={<SignupPage userType="student" />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherLandingPage />} />
          <Route path="/student-dashboard" element={<StudentLandingPage />} />

          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/teachers" element={<ManageTeachers />} />
          <Route path="/admin/reports" element={<Reports />} />

          <Route path="/view-class-details" element={<ViewClassDetails />} />
          <Route path="/view-marks" element={<ViewMarks />} />

          <Route path="/teacher/classes" element={<TeacherManageClasses/>}/>
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
