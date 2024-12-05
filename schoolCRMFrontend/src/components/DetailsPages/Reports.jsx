import React from "react";
import Sidebar from "../LandingPages/Sidebar"; // Adjust path based on your project structure
import { FaChartLine, FaWallet } from "react-icons/fa";

const Reports = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Reports</h1>

        {/* Flex Container for Cards */}
        <div className="flex space-x-8">
          {/* Class Analytics Card */}
          <div className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-1/2">
            <div className="flex items-center space-x-4">
              <FaChartLine className="text-blue-700 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-700">Class Analytics</h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              View and analyze data related to class performance and metrics.
            </p>
          </div>

          {/* Expense Analytics Card */}
          <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-1/2">
            <div className="flex items-center space-x-4">
              <FaWallet className="text-yellow-700 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-700">Expense Analytics</h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Track and review financial data and expenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
