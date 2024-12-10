import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LandingHeader from "../LandingPages/LandingHeader";
import LandingFooter from "../LandingPages/LandingFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://school-erp-cyil.onrender.com/students/login", // Ensure the correct endpoint for student login
        { email, password }
      );

      // Save the token and user data in localStorage
      const userData = response.data;
      console.log(userData);
      localStorage.setItem("authToken", JSON.stringify(userData)); // Save token

      // Show success message
      toast.success(response.data.message);

      // Redirect to the student dashboard after a short delay
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to login. Try again!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <LandingHeader />
      <div className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <FaUserGraduate className="mx-auto text-5xl text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Student Login
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <ToastContainer autoClose={2000} position="top-right" />
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup/student"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default StudentLoginForm;
