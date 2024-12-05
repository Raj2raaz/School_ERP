import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation (optional)
import Sidebar from "../LandingPages/Sidebar"; // Adjust the import path as necessary
import sampleData from "../../sampleData.json"; // Assuming sampleData has classes information

const ManageClasses = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Manage Classes</h1>

        {/* Flex Container for Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleData.classes.map((classDetails) => {
            // Find the teacher for the current class
            const teacher = sampleData.teachers.find((t) => t.id === classDetails.teacher);

            // Find the students for the current class
            const students = sampleData.students.filter((s) =>
              classDetails.students.includes(s.id)
            );

            return (
              <Link
                key={classDetails.id}
                to={`/class-analytics/${classDetails.id}`} // Navigate to Class Analytics (optional)
                className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-700">{classDetails.name}</h2>
                <p className="mt-2 text-lg text-gray-600"><strong>Year:</strong> {classDetails.year}</p>
                <p className="mt-2 text-lg text-gray-600"><strong>Assigned Teacher:</strong> {teacher?.name || 'N/A'}</p>
                <p className="mt-2 text-lg text-gray-600"><strong>Number of Students:</strong> {students.length}</p>
                <p className="mt-2 text-lg text-gray-600"><strong>Student Fees:</strong> ₹{classDetails.studentFees}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
