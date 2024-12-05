import React from "react";
import Sidebar from "./Sidebar";
import { FaUserShield, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeButton={true}
          />
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome, Admin!
        </h1>

        {/* Manage Classes Card */}

        <div className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300">
          <Link to="/admin/classes">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-green-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-gray-700">
                Manage Classes
              </h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Organize and update class schedules efficiently.
            </p>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300">
          <Link to="/admin/teachers">
            <div className="flex items-center space-x-4">
              <FaUserShield className="text-yellow-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-gray-700">
                Manage Teachers
              </h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Oversee teacher assignments and details.
            </p>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 p-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300">
          <Link to="/admin/students">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-green-700 text-3xl" />
              <h2 className="text-2xl font-semibold text-gray-700">
                Manage Students
              </h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Oversee student enrollments and details.
            </p>
          </Link>
        </div>

        {/* Reports Card */}
        <div className="bg-gradient-to-r from-indigo-200 via-blue-200 to-purple-300 p-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300">
          <Link
            to="/admin/reports">

          <div className="flex items-center space-x-4">
            <FaChartBar className="text-indigo-700 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-700">Reports</h2>
          </div>
          <p className="mt-4 text-lg text-gray-600">
            Access detailed analytics and performance metrics.
          </p>
            </Link>
        


        </div>

        {/* Other cards here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
