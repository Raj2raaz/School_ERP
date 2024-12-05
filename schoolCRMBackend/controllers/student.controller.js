import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { studentModel } from "../models/student.model.js";

// Signup(create a new student)
export const signupStudent = async (req, res) => {
  try {
    const { name, gender, dob, contact, feesPaid, class: classId, email, password } = req.body;

    // Check if student already exists
    const existingStudent = await studentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new studentModel({
      name,
      gender,
      dob,
      contact,
      feesPaid,
      class: classId || null,
      email,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully!", data: newStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a new student
export const addStudent = async (req, res) => {
  try {
    const { name, gender, dob, contact, feesPaid, class: classId } = req.body;
    // const newStudent = new studentModel(req.body);
    const newStudent = new studentModel({
        name,
        gender,
        dob,
        contact,
        feesPaid,
        class: classId || null, // Default to null
      });
    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student added successfully!", data: newStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login (Authenticate student)
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Student not found!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful!",
      token, // Send token back to the client
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await studentModel.find().populate('class', 'className year'); // Populate class details (only className and year)
    const formattedStudents = students.map((student) => ({
      ...student._doc,
      dob: student.dob.toISOString().split("T")[0], // Format DOB to "yyyy-MM-dd"
    }));
    res
      .status(200)
      .json({
        message: "Students fetched successfully!",
        data: formattedStudents,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated student object
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student updated successfully!", data: updatedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
