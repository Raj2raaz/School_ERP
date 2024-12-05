import React, { useEffect, useState } from "react";

const ViewMarks = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    // Fetch marks from the backend
    const fetchMarks = async () => {
      try {
        const response = await fetch("/api/marks");
        const data = await response.json();
        setMarks(data);
      } catch (error) {
        console.error("Error fetching marks", error);
      }
    };
    fetchMarks();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-200 via-teal-200 to-cyan-200 p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-700">Your Marks</h2>
      <div className="mt-4 text-lg text-gray-600">
        {marks.length > 0 ? (
          marks.map((mark) => (
            <div key={mark.subject} className="mb-2">
              <p><strong>{mark.subject}:</strong> {mark.score}%</p>
            </div>
          ))
        ) : (
          <p>No marks available</p>
        )}
      </div>
    </div>
  );
};

export default ViewMarks;
