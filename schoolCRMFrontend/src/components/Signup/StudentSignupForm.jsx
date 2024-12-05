// src/components/Signup/StudentSignupForm.js
import React from "react";

const StudentSignupForm = ({ formData, handleInputChange }) => {
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
        <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Contact</label>
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
        <label className="block text-gray-700 font-medium mb-2">Fees Paid</label>
        <input
          type="checkbox"
          name="feesPaid"
          checked={formData.feesPaid}
          onChange={(e) => handleInputChange(e)}
          className="mr-2"
        />
        Yes, fees paid
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Class</label>
        <input
          type="text"
          name="class"
          placeholder="Enter the class"
          value={formData.class}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </>
  );
};

export default StudentSignupForm;
