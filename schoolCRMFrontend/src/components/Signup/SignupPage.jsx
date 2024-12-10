import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";

const SignupPage = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked, // Correctly handle checkbox as Boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "admin") {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        // Make an API call to the admin signup endpoint
        const response = await axios.post(
          "https://school-erp-cyil.onrender.com/admin/signup", // Change endpoint to /signup
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            contact: formData.contact,
          }
        );

        const userData = response.data; // Extract the entire response data
        console.log(userData);
        localStorage.setItem("authToken", JSON.stringify(userData)); // Save token and user data
        toast.success(response.data.message); // Success message from the API

        setTimeout(() => {
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        }, 1000);

        // Reset the form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          contact: "",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to sign up. Please try again."
        );
      }
    } else if (userType === "teacher") {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        // Make an API call to the teacher signup endpoint
        const response = await axios.post(
          "https://school-erp-cyil.onrender.com/teachers/signup", // Adjust endpoint to /signup
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            contact: formData.contact,
            gender: formData.gender,
            dob: formData.dob,
            salary: formData.salary,
            assignedClass: formData.assignedClass || null, // Add assigned class, default to null if not assigned
          }
        );

        const userData = response.data; // Extract the entire response data
        console.log(userData);
        localStorage.setItem("authToken", JSON.stringify(userData)); // Save token and user data
        toast.success(response.data.message); // Success message from the API

        setTimeout(() => {
          navigate("/teacher-dashboard"); // Redirect to teacher dashboard
        }, 1000);

        // Reset the form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          contact: "",
          gender: "",
          dob: "",
          salary: "",
          assignedClass: "",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to sign up. Please try again."
        );
      }
    } else if (userType === "student") {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        // Make an API call to the student signup endpoint
        const response = await axios.post(
          "https://school-erp-cyil.onrender.com/students/signup",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            contact: formData.contact,
            gender: formData.gender,
            dob: formData.dob,
            feesPaid: formData.feesPaid,
            class: formData.class, // Use the class field here
          }
        );
        const userData = response.data; // Extract the entire response data
        console.log(userData);

        localStorage.setItem("authToken", JSON.stringify(userData)); // Save token and user data in localStorage
        toast.success(response.data.message); // Success message from the API
        setTimeout(() => {
          navigate("/student-dashboard");
        }, 1000);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          contact: "",
          gender: "",
          dob: "",
          feesPaid: false,
          class: "", // Default to empty, or you can add a null class value if required
        });
      } catch (error) {
        console.log(error.response?.data?.error);
        toast.error(
          error.response?.data?.error || "Failed to sign up. Please try again."
        );
      }
    } else {
      toast.error(
        "Signup functionality for this user type is not implemented yet."
      );
    }
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-24 pb-16 px-4 md:px-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="mb-2">{getIcon()}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2 text-center">
                {successMessage}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors delay-100"
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
      />
      <LandingFooter />
    </>
  );
};

export default SignupPage;
