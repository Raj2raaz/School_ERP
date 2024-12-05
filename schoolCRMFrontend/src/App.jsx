import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentComponet from "./components/StudentComponent";
import TeacherComponent from "./components/TeacherComponent";
import ClassComponent from "./components/ClassComponent";
import LoginPage from "./components/Login/LoginPage.jsx";
import SignupPage from "./components/Signup/SignupPage.jsx";
import SchoolLandingPage from "./components/LandingPages/SchoolLandingPage.jsx";
import StudentLandingPage from "./components/LandingPages/StudentLandingPage.jsx";
import ViewClassDetails from "./components/DetailsPages/ViewClassDetails.jsx";
import ViewMarks from "./components/DetailsPages/ViewMarks.jsx";


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
          <Route path="/login/admin" element={<LoginPage userType="Admin" />} />
          <Route
            path="/login/teacher"
            element={<LoginPage userType="Teacher" />}
          />
          <Route
            path="/login/student"
            element={<LoginPage userType="Student" />}
          />
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
          <Route path="/student-landing" element={<StudentLandingPage />} />
        <Route path="/view-class-details" element={<ViewClassDetails />} />
        <Route path="/view-marks" element={<ViewMarks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
