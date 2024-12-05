import React from "react";
import schoolImg from "../../assets/School_svg.jpg";
import { Link } from "react-router-dom";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import LandingHeader from "./LandingHeader";
import LandingFooter from "./LandingFooter";

const SchoolLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <LandingHeader />

      {/* Main Content Section */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-136px)] place-items-center px-10 py-16">
        {/* Left Section: Heading and Image */}
        <div className="flex flex-col justify-center items-center text-center space-y-8">
          {/* Heading Section */}
          <div>
            <h1 className="text-5xl font-bold text-gray-800">
              Welcome to MySchool
            </h1>
            <p className="text-xl text-gray-600 mt-4">
              Where Learning Meets Excellence
            </p>
          </div>

          {/* Image Section */}
          <div className="relative mb-12">
            <img
              src={schoolImg}
              alt="School"
              className="w-full max-w-xl mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Right Section: Cards */}
        <div className="flex flex-col justify-center space-y-6">
          <Link
            to="/login/admin"
            className="block bg-white shadow-lg rounded-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 h-auto"
          >
            <FaUserShield className="text-blue-800 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-800">Admin</h2>
            <p className="text-gray-600 mt-2">
              Manage school administration tasks.
            </p>
          </Link>
          <Link
            to="/login/teacher"
            className="block bg-white shadow-lg rounded-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 h-auto"
          >
            <FaChalkboardTeacher className="text-green-800 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800">Teacher</h2>
            <p className="text-gray-600 mt-2">Access tools and resources.</p>
          </Link>
          <Link
            to="/login/student"
            className="block bg-white shadow-lg rounded-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 h-auto"
          >
            <FaUserGraduate className="text-red-800 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-800">Student</h2>
            <p className="text-gray-600 mt-2">View courses and assignments.</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default SchoolLandingPage;
