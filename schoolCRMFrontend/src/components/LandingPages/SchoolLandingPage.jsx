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
    <>
      <LandingHeader />
      {/* Add a top margin to prevent content overlap with the fixed header */}
      <div className="min-h-screen flex flex-col bg-gray-100 pt-[88px]">
        {/* Main Content Section */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 min-h-screen md:pt-4 md:pb-8">
          {/* Left Section: Heading and Image */}
          <div className="flex flex-col justify-center items-center text-center space-y-8 px-6 py-10 md:py-0">
            {/* Heading Section */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Welcome to MySchool
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-4">
                Where Learning Meets Excellence
              </p>
            </div>

            {/* Image Section */}
            <div className="relative mb-12">
              <img
                src={schoolImg}
                alt="School"
                className="w-full max-w-lg mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Section: Cards */}
          <div className="relative px-6 py-10 md:py-0 flex flex-col justify-center items-center space-y-6">
            <Link
              to="/login/admin"
              className="block bg-white shadow-lg rounded-lg p-6 md:p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 w-11/12 max-w-sm"
            >
              <FaUserShield className="text-blue-800 text-4xl md:text-5xl mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-blue-800">
                Admin
              </h2>
              <p className="text-gray-600 mt-2">
                Manage school administration tasks.
              </p>
            </Link>
            <Link
              to="/login/teacher"
              className="block bg-white shadow-lg rounded-lg p-6 md:p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 w-11/12 max-w-sm"
            >
              <FaChalkboardTeacher className="text-green-800 text-4xl md:text-5xl mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-green-800">
                Teacher
              </h2>
              <p className="text-gray-600 mt-2">Access tools and resources.</p>
            </Link>
            <Link
              to="/login/student"
              className="block bg-white shadow-lg rounded-lg p-6 md:p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 w-11/12 max-w-sm"
            >
              <FaUserGraduate className="text-red-800 text-4xl md:text-5xl mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-red-800">
                Student
              </h2>
              <p className="text-gray-600 mt-2">View courses and assignments.</p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <LandingFooter />
      </div>
    </>
  );
};

export default SchoolLandingPage;
