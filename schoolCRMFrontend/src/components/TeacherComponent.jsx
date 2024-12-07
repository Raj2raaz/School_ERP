import React, { useState, useEffect } from "react";
import axios from "axios";

function TeacherComponent() {
  const [teacher, setTeacher] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    salary: "",
    assignedClass: null,
  });
  const [error, setError] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [editingTeacherId, setEditingTeacherId] = useState(null);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClassesWithDefault = async () => {
      try {
        const defaultClass = {
          _id: null,
          className: "Not Yet Allocated",
          year: "",
        };
        const response = await axios.get(
          "https://school-erp-cyil.onrender.com/classes/display"
        );
        const updatedClasses = [defaultClass, ...response.data.data];
        setClasses(updatedClasses);
      } catch (err) {
        alert("Failed to fetch classes. Please try again.");
      }
    };
    fetchClassesWithDefault();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTeacher({ ...teacher, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    try {
      if (editingTeacherId) {
        // If we are editing an existing teacher
        const response = await axios.put(
          `https://school-erp-cyil.onrender.com/teachers/update/${editingTeacherId}`,
          teacher
        );
        alert(response.data.message);
        // Update the teacher in the state
        setTeachers((prevTeachers) =>
          prevTeachers.map((t) =>
            t._id === editingTeacherId ? { ...t, ...teacher } : t
          )
        );
      } else {
        const response = await axios.post(
          "https://school-erp-cyil.onrender.com/teachers/add",
          teacher
        );
        alert(response.data.message);
        if (showTable) {
          setTeachers((prevTeachers) => [response.data.data, ...prevTeachers]);
        }
      }
      setTeacher({
        name: "",
        gender: "",
        dob: "",
        contact: "",
        salary: "",
        assignedClass: null,
      }); // Reset form
      setEditingTeacherId(null); // Reset editing state
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to add teacher";
      setError(errorMessage);
    }
  };

  const fetchAllTeachers = async () => {
    try {
      const response = await axios.get(
        "https://school-erp-cyil.onrender.com/teachers/display"
      );
      const sortedTeachers = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTeachers(sortedTeachers);
      setShowTable(true);
    } catch (err) {
      alert("Failed to fetch teachers. Please try again.");
    }
  };

  const handleEdit = (teacherData) => {
    setTeacher({
      name: teacherData.name,
      gender: teacherData.gender,
      dob: teacherData.dob.split("T")[0],
      contact: teacherData.contact,
      salary: teacherData.salary,
      assignedClass: teacherData.assignedClass
        ? teacherData.assignedClass._id
        : null,
    });
    setEditingTeacherId(teacherData._id); // Set the ID of the teacher being edited
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://school-erp-cyil.onrender.com/teachers/delete/${id}`
      );
      alert(response.data.message);
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== id)
      ); // Remove teacher from state
      setTeacher({
        name: "",
        gender: "",
        dob: "",
        contact: "",
        salary: "",
        assignedClass: null,
      }); // Reset form
    } catch (err) {
      alert("Failed to delete teacher. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Teacher</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={teacher.name}
          placeholder="Name"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="gender"
          value={teacher.gender}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          name="dob"
          value={teacher.dob}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contact"
          value={teacher.contact}
          placeholder="Contact (10 digits)"
          onChange={handleChange}
          className="p-2 border rounded"
          pattern="\d{10}"
          title="Enter a 10-digit contact number"
          required
        />
        <input
          type="number"
          name="salary"
          value={teacher.salary}
          placeholder="Salary"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="assignedClass"
          value={teacher.assignedClass || ""}
          onChange={(e) =>
            setTeacher({ ...teacher, assignedClass: e.target.value })
          }
          className="p-2 border rounded"
        >
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.className} {cls.year && `(${cls.year})`}
            </option>
          ))}
        </select>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={fetchAllTeachers}
          className="p-2 bg-green-500 text-white rounded"
        >
          All Teachers
        </button>
        {showTable && (
          <div className="mt-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Gender</th>
                  <th className="border border-gray-300 p-2">Date of Birth</th>
                  <th className="border border-gray-300 p-2">Contact</th>
                  <th className="border border-gray-300 p-2">Salary</th>
                  <th className="border border-gray-300 p-2">Assigned Class</th>
                  <th className="border border-gray-300 p-2">
                    Update / Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {teacher.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {teacher.gender}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(teacher.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {teacher.contact}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {teacher.salary}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {teacher.assignedClass?.className || "Not Yet Allocated"}
                    </td>
                    <td className="border p-2 flex gap-2 justify-around">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="p-2 bg-yellow-400 text-white rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="p-2 bg-red-500 text-white rounded"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherComponent;
