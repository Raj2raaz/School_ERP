import React, { useState } from "react";
import Sidebar from "../LandingPages/Sidebar"; // Adjust path based on your project structure
import { FaChartLine, FaWallet } from "react-icons/fa";
import ClassAnalytics from "./ClassAnalytics";
import ExpenseAnalytics from "./ExpenseAnalytics";

const Reports = () => {
  const [activeAnalytics, setActiveAnalytics] = useState(null); // Track which analytics to show

  const handleClose = () => {
    setActiveAnalytics(null); // Reset activeAnalytics to hide the div
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-8 md:p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">Reports</h1>

        {/* Flex Container for Cards */}
        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-10">
          {/* Class Analytics Card */}
          <div
            onClick={() => setActiveAnalytics("class")}
            className={`bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 cursor-pointer ${
              activeAnalytics === "class" && "ring-4 ring-indigo-400"
            }`}
          >
            <div className="flex items-center space-x-4">
              <FaChartLine className="text-blue-700 text-3xl" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Class Analytics</h2>
            </div>
            <p className="mt-4 text-sm sm:text-lg text-gray-600">
              View and analyze data related to class performance and metrics.
            </p>
          </div>

          {/* Expense Analytics Card */}
          <div
            onClick={() => setActiveAnalytics("expense")}
            className={`bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 cursor-pointer ${
              activeAnalytics === "expense" && "ring-4 ring-orange-400"
            }`}
          >
            <div className="flex items-center space-x-4">
              <FaWallet className="text-yellow-700 text-3xl" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Expense Analytics</h2>
            </div>
            <p className="mt-4 text-sm sm:text-lg text-gray-600">
              Track and review financial data and expenses.
            </p>
          </div>
        </div>

        {/* Conditional Div with Close Button */}
        {activeAnalytics && (
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="mt-2 text-gray-600">
              {activeAnalytics === "class" && <ClassAnalytics />}
              {activeAnalytics === "expense" && <ExpenseAnalytics />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
