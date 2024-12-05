import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation (optional)
import Sidebar from "../LandingPages/Sidebar"; // Adjust the import path as necessary
import sampleData from "../../sampleData.json"; // Import sampleData

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState(sampleData.teachers); // Use sampleData here
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    salary: "",
    assignedClass: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      // Update existing teacher
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editingTeacher.id ? { ...t, ...newTeacher } : t
        )
      );
      setEditingTeacher(null);
    } else {
      // Add new teacher
      setTeachers((prev) => [
        ...prev,
        { id: `teacher${teachers.length + 1}`, ...newTeacher },
      ]);
    }
    setNewTeacher({
      name: "",
      gender: "",
      dob: "",
      contact: "",
      salary: "",
      assignedClass: "",
    });
    setShowForm(false); // Hide form after submit
  };

  // Handle editing a teacher
  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher(teacher); // Pre-fill form with teacher data
    setShowForm(true); // Show form when editing
  };

  // Handle deleting a teacher
  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  // Pagination logic
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
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Manage Teachers
        </h1>

        {/* Add Teacher Button */}
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTeacher(null); // Reset the form for adding a new teacher
          }}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Teacher
        </button>

        {/* Table for displaying teacher data */}
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
                  Salary
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Assigned Class
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map((teacher, index) => {
                return (
                  <tr
                    key={teacher.id}
                    className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
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
                      {teacher.salary}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {teacher.assignedClass}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="text-indigo-600 hover:text-indigo-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-all duration-300"
            >
              Prev
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(teachers.length / teachersPerPage)
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-all duration-300"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil(teachers.length / teachersPerPage)}
          </div>
        </div>

        {/* Modal Form (Add/Edit Teacher) */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg w-96 relative transform transition-all duration-500 ease-in-out scale-100 hover:scale-105"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">×</span>
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600">Teacher Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newTeacher.name}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Gender</label>
                  <select
                    name="gender"
                    value={newTeacher.gender}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={newTeacher.dob}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={newTeacher.contact}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={newTeacher.salary}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Assigned Class</label>
                  <input
                    type="text"
                    name="assignedClass"
                    value={newTeacher.assignedClass}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                {editingTeacher ? "Save Changes" : "Add Teacher"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTeachers;
