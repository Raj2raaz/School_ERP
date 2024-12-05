import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassComponent() {
  const [classData, setClassData] = useState({
    name: '',
    year: '',
    teacher: '',
    studentFees: '',
    students: [],
  });
  const [error, setError] = useState('');

  const [classes, setClasses] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    const fetchTeachersAndStudents = async () => {
      try {
        const [teachersRes, studentsRes] = await Promise.all([
          axios.get('http://localhost:5000/teachers/display'),
          axios.get('http://localhost:5000/students/display'),
        ]);
        setTeachers(teachersRes.data.data);
        setStudents(studentsRes.data.data);
      } catch (err) {
        alert('Failed to fetch teachers or students. Please try again.');
      }
    };
    fetchTeachersAndStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'students') {
      const students = Array.from(e.target.selectedOptions, option => option.value);
      setClassData({ ...classData, [name]: students });
    } else {
      setClassData({ ...classData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(classData);
    e.preventDefault();
    setError(''); // Clear any existing errors

    if (!classData.name) {
        setError('Class Name is required');
        return; // Prevent form submission if 'name' is missing
    }
    try {
      if (editingClassId) {
        // If we are editing an existing class
        const response = await axios.put(`http://localhost:5000/classes/update/${editingClassId}`, classData);
        alert(response.data.message);
        setClasses((prevClasses) =>
          prevClasses.map((c) =>
            c._id === editingClassId ? { ...c, ...classData } : c
          )
        );
      } else {
        const response = await axios.post('http://localhost:5000/classes/add', classData);
        alert(response.data.message);
        if (showTable) {
          setClasses((prevClasses) => [response.data.data, ...prevClasses]);
        }
      }
      setClassData({ name: '', year: '', teacher: '', studentFees: '', students: [] });
      setEditingClassId(null); // Reset editing state
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to add class';
      setError(errorMessage);
    }
  };

  const fetchAllClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/classes/display');
      const sortedClasses = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setClasses(sortedClasses);
      setShowTable(true);
    } catch (err) {
      alert('Failed to fetch classes. Please try again.');
    }
  };

  const handleEdit = (classData) => {
    setClassData({
      name: classData.name,
      year: classData.year,
      teacher: classData.teacher._id,
      studentFees: classData.studentFees,
      students: classData.students.map((student) => student._id),
    });
    setEditingClassId(classData._id); // Set the ID of the class being edited
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/classes/delete/${id}`);
      alert(response.data.message);
      setClasses((prevClasses) => prevClasses.filter((cls) => cls._id !== id));
      setClassData({ name: '', year: '', teacher: '', studentFees: '', students: [] }); // Reset form
    } catch (err) {
      alert('Failed to delete class. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Class</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={classData.name}
          placeholder="Class Name (e.g., 10A)"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="year"
          value={classData.year}
          placeholder="Academic Year (e.g., 2024)"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="teacher"
          value={classData.teacher}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="studentFees"
          value={classData.studentFees}
          placeholder="Student Fees"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="students"
          value={classData.students}
          onChange={handleChange}
          className="p-2 border rounded"
          multiple
        >
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={fetchAllClasses}
          className="p-2 bg-green-500 text-white rounded"
        >
          All Classes
        </button>
        {showTable && (
          <div className="mt-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Class Name</th>
                  <th className="border border-gray-300 p-2">Academic Year</th>
                  <th className="border border-gray-300 p-2">Teacher</th>
                  <th className="border border-gray-300 p-2">Student Fees</th>
                  <th className="border border-gray-300 p-2">Students</th>
                  <th className="border border-gray-300 p-2">Update / Delete</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id} className="text-center">
                    <td className="border border-gray-300 p-2">{cls.name}</td>
                    <td className="border border-gray-300 p-2">{cls.year}</td>
                    <td className="border border-gray-300 p-2">{cls.teacher.name}</td>
                    <td className="border border-gray-300 p-2">{cls.studentFees}</td>
                    <td className="border border-gray-300 p-2">
                      {cls.students.map((student) => student.name).join(', ')}
                    </td>
                    <td className="border p-2 flex gap-2 justify-around">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="p-2 bg-yellow-400 text-white rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(cls._id)}
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

export default ClassComponent;
