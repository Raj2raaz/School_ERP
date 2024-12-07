import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClassAnalytics = () => {
  const [classes, setClasses] = useState([]); // State for storing all classes
  const [selectedClassId, setSelectedClassId] = useState(null); // State to store the selected class ID
  const [classDetails, setClassDetails] = useState(null); // State for storing class details
  const [genderData, setGenderData] = useState({ male: 0, female: 0 }); // State for gender data

  // Fetch all classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          "https://school-erp-cyil.onrender.com/classes/display"
        );
        setClasses(res.data.data); // Set all classes to the state
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  // Fetch class details and gender data when a class is selected
  useEffect(() => {
    if (selectedClassId) {
      const fetchClassData = async () => {
        try {
          const res = await axios.get(
            `https://school-erp-cyil.onrender.com/classes/find/${selectedClassId}`
          );
          setClassDetails(res.data.data); // Set class details

          // Calculate gender distribution
          const maleCount =
            res.data.data.students?.filter(
              (student) => student.gender === "Male"
            ).length || 0;
          const femaleCount =
            res.data.data.students?.filter(
              (student) => student.gender === "Female"
            ).length || 0;
          setGenderData({ male: maleCount, female: femaleCount }); // Set gender data
        } catch (error) {
          console.error("Error fetching class data:", error);
        }
      };

      fetchClassData();
    }
  }, [selectedClassId]); // Re-fetch when classId changes

  // Chart Data
  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [genderData.male, genderData.female],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Options to show labels on the bars
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const count = context.raw;
            return `${count} students`; // Show the count in the tooltip
          },
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="flex-1 p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Class List
        </h1>

        {/* Table to Display All Classes */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Class Name
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr
                  key={classItem._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedClassId(classItem._id)} // Set selected class ID
                >
                  <td className="px-4 py-2">{classItem.className}</td>
                  <td className="px-4 py-2">{classItem.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* If a class is selected, display its analytics */}
        {classDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Class Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-700">
                {classDetails.className}
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                <strong>Year:</strong> {classDetails.year}
              </p>
              <p className="mt-2 text-lg text-gray-600">
                <strong>Assigned Teacher:</strong>{" "}
                {classDetails.teacher?.name || "No teacher assigned"}
              </p>

              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                Students List:
              </h3>
              <ul className="mt-2">
                {classDetails.students?.length > 0 ? (
                  classDetails.students.map((student) => (
                    <li key={student._id} className="text-gray-600">
                      {student.name}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No students available</li>
                )}
              </ul>

              {/* Display Male and Female Count */}
              <div className="mt-4">
                <p className="text-lg text-gray-600">
                  Male Students: {genderData.male}
                </p>
                <p className="text-lg text-gray-600">
                  Female Students: {genderData.female}
                </p>
              </div>
            </div>

            {/* Gender Ratio Graph Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Gender Distribution
              </h2>
              <Bar data={chartData} options={options} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassAnalytics;
