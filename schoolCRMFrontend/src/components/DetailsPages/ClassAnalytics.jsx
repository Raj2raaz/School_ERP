import React from "react";
import { Bar } from "react-chartjs-2";
import Sidebar from "../Sidebar"; // Adjust the import path as necessary
import sampleData from "../../sampleData.json";

const ClassAnalytics = ({ classId }) => {
  // Find the class by ID
  const classDetails = sampleData.classes.find((cls) => cls.id === classId);
  const teacher = sampleData.teachers.find((t) => t.id === classDetails.teacher);
  const students = sampleData.students.filter((s) =>
    classDetails.students.includes(s.id)
  );

  // Calculate gender counts
  const genderCounts = students.reduce(
    (acc, student) => {
      if (student.gender === "Male") acc.male++;
      if (student.gender === "Female") acc.female++;
      return acc;
    },
    { male: 0, female: 0 }
  );

  const graphData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Number of Students",
        data: [genderCounts.male, genderCounts.female],
        backgroundColor: ["#4C9AFF", "#FF6384"],
        borderColor: ["#307AFF", "#FF4D73"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Class Analytics
        </h1>

        {/* Class Details Section */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Class Details</h2>
          <div className="mt-4 text-lg text-gray-600">
            <p><strong>Name:</strong> {classDetails.name}</p>
            <p><strong>Year:</strong> {classDetails.year}</p>
            <p><strong>Assigned Teacher:</strong> {teacher.name}</p>
            <p><strong>Number of Students:</strong> {students.length}</p>
            <p><strong>Student Fees:</strong> ₹{classDetails.studentFees}</p>
          </div>
        </div>

        {/* Students List Section */}
        <div className="bg-gradient-to-r from-green-200 to-teal-200 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Students List</h2>
          <ul className="mt-4 text-lg text-gray-600 space-y-2">
            {students.map((student) => (
              <li key={student.id}>
                {student.name} ({student.gender})
              </li>
            ))}
          </ul>
        </div>

        {/* Gender Distribution Graph */}
        <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Gender Distribution
          </h2>
          <Bar data={graphData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default ClassAnalytics;
