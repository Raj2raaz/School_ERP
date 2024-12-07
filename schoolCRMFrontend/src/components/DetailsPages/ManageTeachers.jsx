import React, { useState, useEffect } from "react";
import Sidebar from "../LandingPages/Sidebar"; // Adjust the import path as necessary
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    salary: "",
    assignedClass: "",
    email: "",
    password: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch teachers
    axios.get("http://localhost:5000/teachers/display").then((res) => {
      setTeachers(res.data.data);
    });

    // Fetch classes
    axios.get("http://localhost:5000/classes/display").then((res) => {
      setClasses(res.data.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newTeacher); // Log the data to check if it's correct
  
    // Validation checks
    if (!newTeacher.name || !newTeacher.email || !newTeacher.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    // If passwords are involved, add validation for matching passwords (if needed)
    if (newTeacher.password !== newTeacher.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      if (editingTeacher) {
        // If editing an existing teacher, use PUT request
        const response = await axios.put(
          `http://localhost:5000/teachers/update/${editingTeacher._id}`,
          {
            ...newTeacher,
            assignedClass: newTeacher.assignedClass ? newTeacher.assignedClass : null, // Ensure it's valid
          }
        );
  
        if (response.status === 200) {
          setTeachers((prev) =>
            prev.map((t) =>
              t._id === editingTeacher._id ? { ...t, ...newTeacher } : t
            )
          );
          toast.success("Teacher updated successfully!");
          setEditingTeacher(null);
          setShowForm(false);
        } else {
          console.error("Failed to update teacher:", response.data);
        }
      } else {
        // If adding a new teacher, use POST request
        const response = await axios.post(
          "http://localhost:5000/teachers/add",
          {
            ...newTeacher,
            assignedClass: newTeacher.assignedClass ? newTeacher.assignedClass : null, // Ensure it's valid
          }
        );
  
        if (response.status === 201) {
          setTeachers((prev) => [...prev, response.data]);
          toast.success("Teacher added successfully!");
          setShowForm(false);
        } else {
          console.error("Failed to add teacher:", response.data);
        }
      }
  
      // Reset form after submission
      setNewTeacher({
        name: "",
        gender: "",
        dob: "",
        contact: "",
        salary: "",
        assignedClass: "",
        email: "",
        password: "",
        confirmPassword: "", // Add this to handle confirmPassword field
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      ...teacher,
      assignedClass: teacher.assignedClass?._id || "", // Use _id of assigned class
    });
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/teachers/delete/${id}`).then(() => {
      setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
    });
  };

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-10 space-y-8">
        <ToastContainer/>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Manage Teachers
        </h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingTeacher(null);
          }}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 focus:outline-none"
        >
          Add Teacher
        </button>

        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg mb-8">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm">#</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Teacher Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Gender
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  DOB
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Contact
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Assigned Class
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            {/* {console.log(currentTeachers)} */}
            <tbody>
              {currentTeachers.map((teacher, index) => (
                <tr key={teacher._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {index + 1 + (currentPage - 1) * teachersPerPage}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {teacher.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {teacher.gender}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {teacher.dob}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {teacher.contact}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {teacher.assignedClass?.className || "Not Assigned"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="text-indigo-600 hover:text-indigo-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg"
          >
            Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(teachers.length / teachersPerPage)
            }
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg"
          >
            Next
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh] relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-red-500 text-2xl"
            >
              ×
            </button>
        
            <h2 className="text-2xl font-semibold mb-6">
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </h2>
        
            {/* Form Inputs */}
            <div className="space-y-4">
              {/* Teacher Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Teacher Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTeacher.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={newTeacher.gender}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
        
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={newTeacher.dob}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={newTeacher.contact}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={newTeacher.salary}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Assigned Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned Class</label>
                <select
                  name="assignedClass"
                  value={newTeacher.assignedClass}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.className}
                    </option>
                  ))}
                </select>
              </div>
        
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newTeacher.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newTeacher.password}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={newTeacher.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
        
              {/* Submit Button */}
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingTeacher ? "Update Teacher" : "Add Teacher"}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        
        )}
      </div>
    </div>
  );
};

export default ManageTeachers;
