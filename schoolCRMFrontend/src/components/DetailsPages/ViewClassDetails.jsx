import React, { useEffect, useState } from "react";

const ViewClassDetails = () => {
  const [classDetails, setClassDetails] = useState({});

  useEffect(() => {
    // Fetch class details from the backend (e.g., by user ID)
    const fetchClassDetails = async () => {
      try {
        const response = await fetch("/api/class-details");
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        console.error("Error fetching class details", error);
      }
    };
    fetchClassDetails();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-purple-300 p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-700">Class Details</h2>
      <div className="mt-4 text-lg text-gray-600">
        <p><strong>Class Name:</strong> {classDetails.name || "N/A"}</p>
        <p><strong>Assigned Teacher:</strong> {classDetails.teacher || "N/A"}</p>
        <p><strong>Subject:</strong> {classDetails.subject || "N/A"}</p>
      </div>
    </div>
  );
};

export default ViewClassDetails;
