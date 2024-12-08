import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LandingHeader from "../LandingPages/LandingHeader";
import LandingFooter from "../LandingPages/LandingFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://school-erp-cyil.onrender.com/admin/login",
        {
          email,
          password,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to login. Try again!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 pt-[88px]">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
          <div className="text-center mb-6">
            <FaUserShield className="mx-auto text-5xl text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Admin Login
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeButton={true}
          />
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup/admin"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default AdminLoginForm;
