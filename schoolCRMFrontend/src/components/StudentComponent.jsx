import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentComponet() {
  const [student, setStudent] = useState({
    name: '',
    gender: '',
    dob: '',
    contact: '',
    feesPaid: false,
    class: null,
  });
  const [error, setError] = useState('');

  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [editingStudentId, setEditingStudentId] = useState(null);

  const [classes, setClasses] = useState([]);

  

  useEffect(() => {
    const fetchClassesWithDefault = async () => {
      try {
        const defaultClass = { _id: null, className: "Not Yet Allocated", year: "" };
        const response = await axios.get("http://localhost:5000/classes/display");
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
    setStudent({ ...student, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
      if (editingStudentId) {
        // If we are editing an existing student
        const response = await axios.put(`http://localhost:5000/students/update/${editingStudentId}`, student);
        alert(response.data.message);
        // Update the student in the state
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s._id === editingStudentId ? { ...s, ...student } : s
          )
        );
      } 
      else {
        const response = await axios.post('http://localhost:5000/students/add', student);
        alert(response.data.message);
        // console.log(response.data);
        if(showTable){
          setStudents((prevStudents) => [response.data.data, ...prevStudents]);
        }
      }
      setStudent({ name: '', gender: '', dob: '', contact: '', feesPaid: false }); // Reset form
      setEditingStudentId(null); // Reset editing state
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to add student';
      setError(errorMessage);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students/display');
      const sortedStudents = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setStudents(sortedStudents);
      setShowTable(true);
    } catch (err) {
      alert('Failed to fetch students. Please try again.');
    }
  };

  const handleEdit = (studentData) => {
    setStudent({
      name: studentData.name,
      gender: studentData.gender,
      dob: studentData.dob.split('T')[0],
      contact: studentData.contact,
      feesPaid: studentData.feesPaid,
    });
    setEditingStudentId(studentData._id); // Set the ID of the student being edited
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/students/delete/${id}`);
      alert(response.data.message);
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id)); // Remove student from state
      setStudent({ name: '', gender: '', dob: '', contact: '', feesPaid: false,  }); // Reset form
    } catch (err) {
      alert('Failed to delete student. Please try again.');
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={student.name}
          placeholder="Name"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="gender"
          value={student.gender}
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
          value={student.dob}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contact"
          value={student.contact}
          placeholder="Contact (10 digits)"
          onChange={handleChange}
          className="p-2 border rounded"
          pattern="\d{10}"
          title="Enter a 10-digit contact number"
          required
        />

        <select
          name="class"
          value={student.class || ''}
          onChange={(e) => {
            const selectedValue = e.target.value === '' ? null : e.target.value;
            setStudent({ ...student, class: selectedValue });
          }}
          className="p-2 border rounded"
          required
        >
          {/* <option value={null}>Not Yet Allocated</option> */}
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.className} {cls.year && `(${cls.year})`}
            </option>
          ))}
        </select>


        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="feesPaid"
            checked={student.feesPaid}
            onChange={handleChange}
          />
          Fees Paid
        </label>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      <div className="mt-4">
  <button
    onClick={fetchAllStudents}
    className="p-2 bg-green-500 text-white rounded"
  >
    All Students
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
            <th className="border border-gray-300 p-2">Class</th>
            <th className="border border-gray-300 p-2">Fees Paid</th>
            <th className="border border-gray-300 p-2">Update / Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.gender}</td>
              <td className="border border-gray-300 p-2">
                {new Date(student.dob).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="border border-gray-300 p-2">{student.contact}</td>
              <td className="border border-gray-300 p-2">
                {student.class?.className || "Not Yet Allocated"}
              </td>

              <td className="border border-gray-300 p-2">
                {student.feesPaid ? 'Yes' : 'No'}
              </td>
              <td className="border p-2 flex gap-2 justify-around">
                <button
                  onClick={() => handleEdit(student)}
                  className="p-2 bg-yellow-400 text-white rounded"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
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

export default StudentComponet;