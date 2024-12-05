import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingHeader from "../LandingPages/LandingHeader";
import LandingFooter from "../LandingPages/LandingFooter";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import AdminSignupForm from "./AdminSignupForm";
import TeacherSignupForm from "./TeacherSignupForm";
import StudentSignupForm from "./StudentSignupForm";

const SignupPage = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    password: "",
    confirmPassword: "",
    feesPaid: false,
    class: "",
    salary: "",
    assignedClass: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getIcon = () => {
    switch (userType) {
      case "admin":
        return <FaUserShield className="mx-auto text-4xl text-blue-500" />;
      case "teacher":
        return (
          <FaChalkboardTeacher className="mx-auto text-4xl text-blue-500" />
        );
      case "student":
        return <FaUserGraduate className="mx-auto text-4xl text-blue-500" />;
      default:
        return null;
    }
  };

  const renderFormFields = () => {
    switch (userType) {
      case "student":
        return (
          <StudentSignupForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "teacher":
        return (
          <TeacherSignupForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "admin":
        return (
          <AdminSignupForm
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h2>
            {getIcon()}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to={`/login/${userType}`}
              className="text-blue-500 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      <LandingFooter />
    </>
  );
};

export default SignupPage;
