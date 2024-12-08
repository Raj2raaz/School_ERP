import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaChalkboard, FaUsers, FaTasks, FaCog, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // Importing toast
import { ToastContainer } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleLogout = () => {
    // Clear any user data (localStorage, sessionStorage, etc.)
    localStorage.removeItem("userToken"); // Example: Clear token from localStorage (if using)
    sessionStorage.removeItem("userToken"); // Example: Clear token from sessionStorage (if using)

    // Show success toast
    toast.success("Logged out successfully!");

    // Redirect to login page (you can adjust this to your app's login path)
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="w-64 bg-gradient-to-b from-purple-500 via-indigo-400 to-blue-300 text-white shadow-lg flex flex-col h-screen sticky top-0"
    >
      <Link to="/admin-dashboard">
        <div className="p-6 text-center text-2xl font-semibold">
          Admin Dashboard
        </div>
      </Link>
      <hr className="border-gray-300 my-4" />
      <ul className="space-y-6 mt-6 flex-grow list-none">
        <li>
          <Link
            to="/admin/classes"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300"
          >
            <FaChalkboard className="mr-3 text-white" />
            Manage Classes
          </Link>
        </li>
        <li>
          <Link
            to="/admin/students"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300"
          >
            <FaUsers className="mr-3 text-white" />
            Manage Students
          </Link>
        </li>
        <li>
          <Link
            to="/admin/teachers"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300"
          >
            <FaUserShield className="mr-3 text-white" />
            Manage Teachers
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300"
          >
            <FaTasks className="mr-3 text-white" />
            Assign Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/admin/reports"
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300"
          >
            <FaChartBar className="mr-3 text-white" />
            Reports
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300"
          >
            <FaCog className="mr-3 text-white" />
            Settings
          </Link>
        </li>
      </ul>

      <li className="mt-4 mb-6 mx-2">
        <hr className="border-gray-300 my-4" />
        <button
          onClick={handleLogout}
          style={{ fontSize: "22px" }}
          className="flex items-center px-6 py-3 text-lg font-medium hover:bg-purple-700 rounded-lg transition-all duration-300 w-full text-left"
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

export default Sidebar;
