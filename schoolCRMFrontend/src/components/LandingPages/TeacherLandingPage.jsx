import React from "react";
import TeacherSidebar from "./TeacherSidebar"; // Import the sidebar component
import { FaChalkboard, FaUserCircle, FaClipboardList, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const TeacherLandingPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Side Navbar */}
      <TeacherSidebar /> {/* Use the TeacherSidebar component here */}

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

        {/* Manage Classes Card */}
        <Link to= "/teacher/classes">
        <div className="bg-gradient-to-r from-green-200 via-teal-200 to-cyan-200 p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <FaClipboardList className="text-green-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">Manage Classes</h2>
          </div>
          <div className="mt-4 text-lg text-gray-600">
            <p>View and update class schedules, assignments, and more.</p>
          </div>
        </div>
        </Link>

        {/* View Student Performance Card */}
        <div className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300 p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-blue-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">View Student Performance</h2>
          </div>
          <div className="mt-4 text-lg text-gray-600">
            <p>Analyze student grades, attendance, and participation.</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-yellow-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
          </div>
          <div className="mt-4 text-lg text-gray-600">
            <p>Update your profile information and account settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLandingPage;
