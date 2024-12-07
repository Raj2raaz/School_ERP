import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherSignupForm = ({ formData, handleInputChange }) => {
  const [classes, setClasses] = useState([]);

  // Fetch the available classes for assignment
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://school-erp-cyil.onrender.com/classes/display"
        );
        let result = response.data.data;
        console.log(result);
        setClasses(result);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Salary</label>
        <input
          type="number"
          name="salary"
          placeholder="Enter your salary"
          value={formData.salary}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Contact Number
        </label>
        <input
          type="text"
          name="contact"
          placeholder="Enter your contact number"
          value={formData.contact}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Assigned Class
        </label>
        <select
          name="assignedClass"
          value={formData.assignedClass}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value={null}>Not Allotted</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.className}
            </option>
          ))}
        </select>
      </div>
      {/* Password and Confirm Password Fields */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        />
      </div>
    </>
  );
};

export default TeacherSignupForm;
