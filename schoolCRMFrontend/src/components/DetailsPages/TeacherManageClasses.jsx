
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Sidebar from "../LandingPages/Sidebar";
import TeacherSidebar from '../LandingPages/TeacherSidebar'

const TeacherManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [formData, setFormData] = useState({
    className: "",
    year: "",
    teacher: "",
    students: [],
    studentFees: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

const handleStudentCheckbox = (e, studentId) => {
  const isChecked = e.target.checked;

  setFormData((prev) => ({
    ...prev,
    students: isChecked
      ? [...prev.students, studentId] // Add student ID
      : prev.students.filter((id) => id !== studentId), // Remove student ID
  }));
};


  // Fetch classes, students, and teachers data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await axios.get("http://localhost:5000/classes/display");
        const studentRes = await axios.get("http://localhost:5000/students/display");
        const teacherRes = await axios.get("http://localhost:5000/teachers/display");

        setClasses(classRes.data.data);
        setStudents(studentRes.data.data);
        setTeachers(teacherRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classes.length, students.length, teachers.length]);

  // Handle Add Class Form Submit
  const handleAddClass = async () => {
    try {
      const res = await axios.post("http://localhost:5000/classes/add", formData);
      setClasses([...classes, res.data.data]);
      setIsModalOpen(false);
      alert("Class added successfully!");
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  // Handle Edit Class Form Submit
  const handleEditClass = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/classes/update/${currentClass._id}`, formData);
      setClasses(classes.map((cls) => (cls._id === currentClass._id ? res.data.data : cls)));
      setIsModalOpen(false);
      alert("Class updated successfully!");
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  // Handle Delete Class
  const handleDelete = async (classId) => {
    try {
      await axios.delete(`http://localhost:5000/classes/delete/${classId}`);
      setClasses(classes.filter((classItem) => classItem._id !== classId));
      alert("Class deleted successfully!");
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  // Open the Add Class Modal
  const openAddClassModal = () => {
    setFormData({
      className: "",
      year: "",
      teacher: "",
      students: [],
      studentFees: "",
    });
    setIsModalOpen(true);
  };

  // Open the Edit Class Modal
  const openEditClassModal = (classDetails) => {
    setCurrentClass(classDetails);
    setFormData({
      className: classDetails.className,
      year: classDetails.year,
      teacher: classDetails.teacher,
      students: classDetails.students,
      studentFees: classDetails.studentFees,
    });
    setIsModalOpen(true);
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle student selection change (multiple select)
  const handleStudentSelect = (e) => {
    const selectedStudents = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, students: selectedStudents });
  };

  return (
    
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* {console.log(classes)} */}
      {/* Sidebar */}
      <TeacherSidebar className="sticky top-0 h-screen" />

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Manage Classes</h1>

        {/* Add Class Button */}
        <button
          onClick={openAddClassModal}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Class
        </button>

        {/* Flex Container for Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classDetails) => {
            // Find the teacher for the current class
            // const teacher = teachers.find((t) => t._id === classDetails.teacher);
            // console.log(teacher);

            // Find the students for the current class
            const classStudents = students.filter((s) =>
              classDetails.students.some((student) => student._id === s._id)
            );

            return (
              <div
                key={classDetails._id}
                
                className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-700">{classDetails.className}</h2>
                <p className="mt-2 text-lg text-gray-600">
                  <strong>Year:</strong> {classDetails.year}
                </p>
                <p className="mt-2 text-lg text-gray-600">
                  <strong>Assigned Teacher:</strong> {classDetails?.teacher?.name || "N/A"}
                </p>
                <p className="mt-2 text-lg text-gray-600">
                  <strong>Number of Students:</strong> {classStudents.length}
                </p>
                <p className="mt-2 text-lg text-gray-600">
                  <strong>Student Fees:</strong> ₹{classDetails.studentFees}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => openEditClassModal(classDetails)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classDetails._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        
      </div>

      {/* Modal for Add/Edit Class */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-8 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">
              {currentClass ? "Edit Class" : "Add Class"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                currentClass ? handleEditClass() : handleAddClass();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label htmlFor="className" className="block font-semibold">
                  Class Name
                </label>
                <input
                  type="text"
                  id="className"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="year" className="block font-semibold">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="teacher" className="block font-semibold">
                  Teacher
                </label>
                <select
                  id="teacher"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="space-y-2">
                <label htmlFor="students" className="block font-semibold">
                  Students
                </label>
                <select
                  id="students"
                  name="students"
                  value={formData.students}
                  onChange={handleStudentSelect}
                  multiple
                  className="w-full p-2 border rounded-md"
                >
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="space-y-2">
  <label htmlFor="students" className="block font-semibold">
    Students
  </label>
  <div className="relative">
    <div
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="w-full p-2 border rounded-md cursor-pointer bg-white"
    >
      {formData.students.length > 0
        ? `Selected: ${formData.students.length} students`
        : "Select Students"}
    </div>
    {dropdownOpen && (
      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
        {students.map((student) => (
          <div
            key={student._id}
            className="flex items-center p-2 hover:bg-gray-100"
          >
            <input
              type="checkbox"
              id={`student-${student._id}`}
              value={student._id}
              checked={formData.students.includes(student._id)}
              onChange={(e) => handleStudentCheckbox(e, student._id)}
              className="mr-2"
            />
            <label htmlFor={`student-${student._id}`} className="cursor-pointer">
              {student.name}
            </label>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


              <div className="space-y-2">
                <label htmlFor="studentFees" className="block font-semibold">
                  Student Fees
                </label>
                <input
                  type="number"
                  id="studentFees"
                  name="studentFees"
                  value={formData.studentFees}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  {currentClass ? "Update Class" : "Add Class"}
                </button>
              </div>
            </form>
          </div>
        </div>

      )}
    </div>
  );
};

export default TeacherManageClasses;
