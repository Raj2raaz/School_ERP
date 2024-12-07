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

const ExpenseAnalytics = () => {
  const [teachers, setTeachers] = useState([]); // State to store all teachers
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Selected teacher details
  const [selectedMonth, setSelectedMonth] = useState("January"); // State for selected month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State for selected year
  const [viewType, setViewType] = useState("monthly"); // Toggle between monthly/yearly
  const [expenses, setExpenses] = useState(0); // Store teacher salary expenses
  const [income, setIncome] = useState(0); // Store income from student fees
  const [teacherSalary, setTeacherSalary] = useState(0); // Store individual teacher salary

  // Fetch all teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(
          "https://school-erp-cyil.onrender.com/teachers/display"
        );
        setTeachers(res.data.data); // Set all teachers
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  // Fetch teacher and class details based on selected teacher

  useEffect(() => {
    if (selectedTeacher) {
      const fetchTeacherDetails = async () => {
        try {
          const res = await axios.get(
            `https://school-erp-cyil.onrender.com/teachers/find/${selectedTeacher}`
          );
          const teacherData = res.data.data;

          setTeacherSalary(teacherData.salary); // Set teacher salary

          let totalIncome = 0;

          if (Array.isArray(teacherData.assignedClass)) {
            for (let classItem of teacherData.assignedClass) {
              const classRes = await axios.get(
                `https://school-erp-cyil.onrender.com/classes/find/${classItem._id}`
              );
              const classDetails = classRes.data.data;

              // Use course fees from the class and check students' feesPaid status
              const classIncome = classDetails.students.reduce(
                (total, student) => {
                  return (
                    total + (student.feesPaid ? classDetails.courseFee : 0)
                  );
                },
                0
              );

              totalIncome += classIncome;
            }
          } else if (
            teacherData.assignedClass &&
            teacherData.assignedClass._id
          ) {
            const classRes = await axios.get(
              `https://school-erp-cyil.onrender.com/classes/find/${teacherData.assignedClass._id}`
            );
            const classDetails = classRes.data.data;

            // console.log("Class Details:", classDetails);

            // Use course fees from the class and check students' feesPaid status
            const classIncome = classDetails.students.reduce(
              (total, student) => {
                return (
                  total + (student.feesPaid ? classDetails.studentFees : 0)
                );
              },
              0
            );

            totalIncome += classIncome;
          } else {
            console.error(
              "Assigned class data is invalid:",
              teacherData.assignedClass
            );
          }

          //   console.log("Total Income:", totalIncome);
          setIncome(totalIncome); // Update income state
        } catch (error) {
          console.error("Error fetching teacher details:", error);
        }
      };

      fetchTeacherDetails();
    }
  }, [selectedTeacher]);

  // Calculate expenses (monthly or yearly)
  const calculateExpenses = () => {
    let totalExpenses = 0;

    if (viewType === "monthly") {
      totalExpenses = teacherSalary; // Monthly expense is just the salary
    } else if (viewType === "yearly") {
      totalExpenses = teacherSalary * 12; // Multiply salary by 12 for yearly expense
    }

    setExpenses(totalExpenses);
  };

  // Run calculation whenever viewType or teacher salary changes
  useEffect(() => {
    calculateExpenses();
  }, [viewType, teacherSalary]);

  // Chart Data
  const chartData = {
    labels: ["Salary Expenses", "Income from Fees"],
    datasets: [
      {
        label: viewType === "monthly" ? "Monthly Data" : "Yearly Data",
        data: [expenses, income],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw} ${
              viewType === "monthly" ? "per Month" : "per Year"
            }`,
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="flex-1 p-10 space-y-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Expense Analytics
        </h1>

        {/* Teacher Selection */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Select Teacher
          </h2>
          <select
            className="p-2 border border-gray-300 rounded"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value={null}>-- Select Teacher --</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Between Monthly/Yearly View */}
        <div className="mt-4">
          <label className="mr-2">View Type:</label>
          <button
            className={`py-2 px-4 rounded ${
              viewType === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewType("monthly")}
          >
            Monthly
          </button>
          <button
            className={`ml-2 py-2 px-4 rounded ${
              viewType === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewType("yearly")}
          >
            Yearly
          </button>
        </div>

        {/* Display Chart */}
        {selectedTeacher && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Analytics
            </h2>
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseAnalytics;
