// import React from "react";
// import { Link } from "react-router-dom";
// import LandingHeader from "../LandingPages/LandingHeader";
// import LandingFooter from "../LandingPages/LandingFooter";
// import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa"; // Import React Icons

// const LoginPage = ({ userType }) => {
//   // Function to return the appropriate icon based on user type
//   const getIcon = () => {
//     if (userType === "admin") {
//       return <FaUserShield className="text-3xl mx-2 " />; // Simple icon
//     } else if (userType === "teacher") {
//       return <FaChalkboardTeacher className="text-3xl mx-2" />; // Simple icon
//     } else if (userType === "student") {
//       return <FaUserGraduate className="text-3xl mx-2" />; // Simple icon
//     }
//     return null; // Default fallback
//   };

// //   const icon = getIcon();

//   return (
//     <>
//       <LandingHeader />

//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//           {/* User Type Heading with Icon */}
//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-bold text-gray-800">
//               Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
//             </h2>
//             {getIcon()} {/* Display the icon after the heading */}
//           </div>

//           {/* Login Form */}
//           <form className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center text-gray-600 mt-4">
//             Don’t have an account?{" "}
//             <Link to={`/signup/${userType}`} className="text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       <LandingFooter />
//     </>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LandingHeader from '../LandingPages/LandingHeader';
import LandingFooter from '../LandingPages/LandingFooter';
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const LoginPage = ({ userType }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = {
      admin: 'http://localhost:5000/admin/login',
      teacher: 'http://localhost:5000/teacher/login',
      student: 'http://localhost:5000/student/login',
    }[userType];
  
    if (!endpoint) {
      alert('Login functionality for this user type is not implemented yet.');
      return;
    }
  
    try {
      const response = await axios.post(endpoint, formData);
      alert(response.data.message);
  
      // Save token and redirect
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };
  

  const getIcon = () => {
    if (userType === 'admin') return <FaUserShield className="text-3xl mx-2" />;
    if (userType === 'teacher') return <FaChalkboardTeacher className="text-3xl mx-2" />;
    if (userType === 'student') return <FaUserGraduate className="text-3xl mx-2" />;
    return null;
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h2>
            {getIcon()}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to={`/signup/${userType}`} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <LandingFooter />
    </>
  );
};

export default LoginPage;
