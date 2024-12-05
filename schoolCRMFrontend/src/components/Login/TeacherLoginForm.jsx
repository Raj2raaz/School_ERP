import React, { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";

const TeacherLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/teacher/login", {
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to login. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Teacher Login</h2>
          <FaChalkboardTeacher className="mx-auto text-4xl text-green-500" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherLoginForm;
