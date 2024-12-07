
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../LandingPages/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    feesPaid: false,
    classId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(`http://localhost:5000/students/display`);
        setStudents(studentsResponse.data.data);

        const classesResponse = await axios.get(`http://localhost:5000/classes/display`);
        setClasses(classesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === "feesPaid" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newStudent.password !== newStudent.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      if (!newStudent.name || !newStudent.email || !newStudent.password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      if (editingStudent) {
        const response = await axios.put(
          `http://localhost:5000/students/update/${editingStudent._id}`,
          newStudent
        );

        if (response.status === 200) {
          setStudents((prev) =>
            prev.map((s) => (s._id === editingStudent._id ? { ...s, ...newStudent } : s))
          );
          toast.success("Student updated successfully!");
        } else {
          console.error("Failed to update student:", response.data);
        }
      } else {
        const response = await axios.post("http://localhost:5000/students/add", newStudent);

        if (response.status === 201) {
          setStudents((prev) => [...prev, response.data]);
          toast.success("Student added successfully!");
        } else {
          console.error("Failed to add student:", response.data);
        }
      }

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewStudent({
      ...student,
      password: "",
      confirmPassword: "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/delete/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student", error);
      toast.error("Failed to delete student.");
    }
  };

  const resetForm = () => {
    setNewStudent({
      name: "",
      gender: "",
      dob: "",
      contact: "",
      feesPaid: false,
      classId: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setEditingStudent(null);
    setShowForm(false);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-10 space-y-8">
      <ToastContainer />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Manage Students</h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingStudent(null);
          }}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Student
        </button>

        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg mb-8">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm">#</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Gender</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">DOB</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Contact</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Fees</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Class</th>
                <th className="px-6 py-3 text-left font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={student._id} className="border-b hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{index + 1 + (currentPage - 1) * studentsPerPage}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.gender}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.dob}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.contact}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    <span className={`px-2 py-1 text-xs rounded-full ${student.feesPaid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {student.feesPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {classes.find((cls) => cls._id === student.classId)?.className || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button onClick={() => handleEdit(student)} className="text-indigo-600 hover:text-indigo-800 mr-3">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(student._id)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 relative max-h-[90%] overflow-y-auto">
              <button type="button" onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <span className="text-2xl">×</span>
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{editingStudent ? "Edit Student" : "Add New Student"}</h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-800">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newStudent.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={newStudent.password}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={newStudent.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800">Gender</label>
                  <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
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
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800">Class</label>
                  <select
                    name="classId"
                    value={newStudent.classId}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-800">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={newStudent.contact}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="feesPaid"
                    checked={newStudent.feesPaid}
                    onChange={(e) =>
                      setNewStudent((prev) => ({
                        ...prev,
                        feesPaid: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  <label className="text-lg font-medium text-gray-800">Fees Paid</label>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none"
                >
                  {editingStudent ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
