import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

import { studentModel } from "../models/student.model.js";
import { classModel } from '../models/class.model.js';

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
    const { name, gender, dob, contact, feesPaid, class: classId, email, password } = req.body;
    // const newStudent = new studentModel(req.body);

    // Check if a student with the provided email already exists
    const existingStudent = await studentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists!" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new studentModel({
        name,
        gender,
        dob,
        contact,
        feesPaid,
        class: classId || null, // Default to null
        email,
        password: hashedPassword,
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

// update

export const updateStudent = async (req, res) => {
  try {
    const { _id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Student ID format" });
    }

    // Extract fields from the request body
    const { password, classId, ...otherFields } = req.body;

    // Hash password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      otherFields.password = hashedPassword;  // Use the hashed password
    }

    // If classId is being updated, handle the class assignment logic
    if (classId) {
      // First, remove the student from the old class (if any)
      const student = await studentModel.findById(_id);
      if (student.classId) {
        await classModel.findByIdAndUpdate(student.classId, {
          $pull: { students: _id }  // Remove the student from the old class
        });
      }

      // Now, add the student to the new class
      await classModel.findByIdAndUpdate(classId, {
        $addToSet: { students: _id }  // Add the student to the new class
      });
    }

    // Update the student document
    const updatedStudent = await studentModel.findByIdAndUpdate(
      _id,
      { ...otherFields, classId }, // Update student with other fields and new classId
      { new: true } // Return the updated student object
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found or not updated" });
    }

    res.status(200).json({
      message: "Student updated successfully!",
      data: updatedStudent,
    });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: err.message });  // Return the full error message to the client
  }
};


// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Deleting student with ID:", _id);

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Student ID format" });
    }

    const deletedStudent = await studentModel.findByIdAndDelete(_id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found or not deleted" });
    }

    res.status(200).json({
      message: "Student deleted successfully!",
      data: deletedStudent, // Optional: You can send back the deleted student data
    });
  } catch (err) {
    console.error(err); // Log the error in the server console
    res.status(500).json({ error: err.message }); // Send the full error message to the client
  }
};

