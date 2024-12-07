import React, { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LandingHeader from "../LandingPages/LandingHeader";
import LandingFooter from "../LandingPages/LandingFooter";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toast

const TeacherLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://school-erp-cyil.onrender.com/teachers/login",
        {
          email,
          password,
        }
      );
      toast.success(response.data.message); // Show success toast
      setTimeout(() => {
        navigate("/teacher-dashboard"); // Replace with actual teacher dashboard route
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to login. Try again!"
      );
      toast.error(error.response?.data?.error || "Failed to login. Try again!"); // Show error toast
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <FaChalkboardTeacher className="mx-auto text-5xl text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Teacher Login
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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
              to="/signup/teacher"
              className="text-green-500 hover:underline font-medium"
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

export default TeacherLoginForm;
