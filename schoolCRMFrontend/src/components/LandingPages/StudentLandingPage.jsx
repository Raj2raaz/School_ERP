import React from "react";
import StudentSidebar from "./StudentSidebar"; // Import the StudentSidebar component
import { FaBook, FaMedal, FaInfoCircle } from "react-icons/fa";

const StudentLandingPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Side Navbar */}
      <StudentSidebar /> {/* Use the StudentSidebar component */}

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

        {/* Class Details Card */}
        <div className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-purple-300 p-8 rounded-lg shadow-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <FaBook className="text-indigo-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">Class Details</h2>
          </div>
          <div className="mt-4 text-lg text-gray-600">
            <p><strong>Class Name:</strong> 10th Grade</p>
            <p><strong>Assigned Teacher:</strong> Mr. Smith</p>
            <p><strong>Subject:</strong> Mathematics</p>
          </div>
        </div>

        {/* Marks Card */}
        <div className="bg-gradient-to-r from-green-200 via-teal-200 to-cyan-200 p-8 rounded-lg shadow-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <FaMedal className="text-green-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">Marks</h2>
          </div>
          <div className="mt-4 text-lg text-gray-600">
            <p><strong>Mathematics:</strong> 85%</p>
            <p><strong>Science:</strong> 90%</p>
            <p><strong>English:</strong> 78%</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-8 rounded-lg shadow-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <FaInfoCircle className="text-yellow-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
          </div>
          <div className="mt-4 text-lg text-gray-600">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Grade:</strong> 10th</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLandingPage;
