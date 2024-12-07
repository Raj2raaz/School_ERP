import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // Importing toast
import { ToastContainer } from "react-toastify";

const StudentSidebar = () => {
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleLogout = () => {
    // Clear any user data (localStorage, sessionStorage, etc.)
    localStorage.removeItem("userToken"); // Example: Clear token from localStorage (if using)
    sessionStorage.removeItem("userToken"); // Example: Clear token from sessionStorage (if using)

    // Show success toast
    toast.success("Logged out successfully!");

    // Redirect to login page
    setTimeout(() => {
      navigate("/"); // Redirect to the login page
    }, 1000);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-500 via-blue-400 to-green-300 text-white shadow-lg flex flex-col h-screen">
      <Link  to='/student-dashboard' className="p-6 text-center text-3xl font-semibold">Student Dashboard</Link>
      <hr className="border-gray-300 my-4" />
      <ul className="space-y-6 mt-6 flex-grow list-none">
        <li>
          <Link
            to="/view-class-details"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-blue-700 rounded-lg transition-all duration-300"
          >
            <FaChalkboardTeacher className="mr-3 text-white" />
            View Class Details
          </Link>
        </li>
        <li>
          <Link
            to="/view-marks"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-blue-700 rounded-lg transition-all duration-300"
          >
            <FaUserGraduate className="mr-3 text-white" />
            View Marks
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-blue-700 rounded-lg transition-all duration-300"
          >
            <FaUserCircle className="mr-3 text-white" />
            Profile
          </Link>
        </li>
      </ul>

      {/* Logout menu item at the bottom */}
      <li className="mt-4 mb-6 mx-2">
        <hr className="border-gray-300 my-4" />
        <button
          onClick={handleLogout}
          style={{ fontSize: '22px' }} // Larger font size
          className="flex items-center px-6 py-3 text-lg font-medium hover:bg-blue-700 rounded-lg transition-all duration-300 w-full text-left"
        >
          <FaSignOutAlt className="mr-3 text-white" />
          Logout
        </button>
      </li>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
      />
    </div>
  );
};

export default StudentSidebar;
