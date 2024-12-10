import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserShield,
  FaChalkboard,
  FaUsers,
  FaTasks,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [timeoutId, setTimeoutId] = useState(null); // Timeout ID for auto-close

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // sessionStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleToggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
    resetAutoCloseTimer(); // Reset timer on interaction
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const resetAutoCloseTimer = () => {
    if (timeoutId) clearTimeout(timeoutId); // Clear existing timeout
    const id = setTimeout(() => setIsOpen(false), 5000); // Auto-close after 5 seconds of inactivity
    setTimeoutId(id);
  };

  useEffect(() => {
    if (isOpen) resetAutoCloseTimer(); // Start timer when sidebar is opened
    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Icon (Visible only on small screens when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={handleToggleSidebar}
          className="fixed top-4 left-4 z-50 bg-purple-500 text-white p-3 rounded-full shadow-md sm:opacity-80 sm:hover:opacity-100 sm:block md:hidden transition-opacity"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-500 via-indigo-400 to-blue-300 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:relative md:h-screen z-40 flex flex-col`}
      >
        {/* Close Button (Visible only on small screens when sidebar is open) */}
        {isOpen && (
          <button
            onClick={handleCloseSidebar}
            className="absolute top-2 right-2 text-white bg-purple-700 hover:bg-purple-800 p-2 rounded-full md:hidden"
          >
            <FaTimes size={18} />
          </button>
        )}

        <Link to="/admin-dashboard">
          <div className="p-6 text-center text-2xl font-semibold">Admin Dashboard</div>
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

        {/* Logout section */}
        <div className="mt-auto px-6 py-3">
          <hr className="border-gray-300 mb-4 " />
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-lg font-semibold hover:bg-purple-700 rounded-lg transition-all duration-300 w-full text-left"
          >
            <FaSignOutAlt className="mr-3 text-white" />
            Logout
          </button>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeButton={true}
        />
      </div>
    </>
  );
};

export default Sidebar;
