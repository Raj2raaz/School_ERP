import React, { useState } from "react";
import sampleData from "../../sampleData.json"; // Adjust the path accordingly
import Sidebar from '../LandingPages/Sidebar';
import { Link } from 'react-router-dom';

const ManageStudents = () => {
  const [students, setStudents] = useState(sampleData.students);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    feesPaid: false,
    class: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      // Update existing student
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id ? { ...s, ...newStudent } : s
        )
      );
      setEditingStudent(null);
    } else {
      // Add new student
      setStudents((prev) => [
        ...prev,
        { id: `student${students.length + 1}`, ...newStudent },
      ]);
    }
    setNewStudent({
      name: "",
      gender: "",
      dob: "",
      contact: "",
      feesPaid: false,
      class: "",
      email: "",
    });
    setShowForm(false); // Hide form after submit
  };

  // Handle editing a student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewStudent(student);  // Pre-fill form with student data
    setShowForm(true); // Show form when editing
  };

  // Handle deleting a student
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Manage Students</h1>

        {/* Add Student Button */}
        <button
          onClick={() => {
            setShowForm(true);
            setEditingStudent(null); // Reset the form for adding a new student
          }}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Student
        </button>

        {/* Table for displaying student data */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg mb-8">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm">#</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Student Name</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Gender</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">DOB</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Contact</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Fees Paid</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Class</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => {
                return (
                  <tr key={student.id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{index + 1 + (currentPage - 1) * studentsPerPage}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.gender}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.dob}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.contact}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${student.feesPaid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                      >
                        {student.feesPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.class}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-indigo-600 hover:text-indigo-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
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
              disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-all duration-300"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil(students.length / studentsPerPage)}
          </div>
        </div>

        {/* Modal Form (Add/Edit Student) */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 relative transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">×</span>
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {editingStudent ? "Edit Student" : "Add New Student"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-800">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newStudent.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800">Gender</label>
                  <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    value={newStudent.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={newStudent.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800">Fees Paid</label>
                  <select
                    name="feesPaid"
                    value={newStudent.feesPaid}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  >
                    <option value={true}>Paid</option>
                    <option value={false}>Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800">Class</label>
                  <input
                    type="text"
                    name="class"
                    value={newStudent.class}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                >
                  {editingStudent ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
