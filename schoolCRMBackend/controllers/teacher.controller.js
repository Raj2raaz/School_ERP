import { teacherModel } from '../models/teacher.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { classModel } from '../models/class.model.js';

// Add a new teacher
export const addTeacher = async (req, res) => {
  try {
    const { name, gender, dob, contact, salary, assignedClass, email, password } = req.body;

    // Check if a teacher with the provided email already exists
    const existingTeacher = await teacherModel.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher with this email already exists!" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new teacherModel({
      name,
      gender,
      dob,
      contact,
      salary,
      assignedClass: assignedClass || null,
      email,
      password: hashedPassword,
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher added successfully!', data: newTeacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find().populate('assignedClass', 'className');
    const formattedTeachers = teachers.map((teacher) => ({
      ...teacher._doc,
      dob: teacher.dob.toISOString().split('T')[0], // Format DOB to "yyyy-MM-dd"
    }));
    res.status(200).json({ message: 'Teachers fetched successfully!', data: formattedTeachers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get one teacher
export const getTeacherById = async (req, res) => {
  const { _id } = req.params; // Extract teacher ID from request parameters

  try {
    // Find the teacher by ID and populate the assignedClass field
    const teacher = await teacherModel.findById(_id).populate('assignedClass', 'className studentFees');

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found!' });
    }

    // Format the DOB field
    const formattedTeacher = {
      ...teacher._doc,
      dob: teacher.dob.toISOString().split('T')[0], // Format DOB to "yyyy-MM-dd"
    };

    res.status(200).json({ message: 'Teacher fetched successfully!', data: formattedTeacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//update a teacher
export const updateTeacher = async (req, res) => {
  try {
    const { _id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Teacher ID format" });
    }

    // Extract fields from the request body
    const { password, assignedClass, ...otherFields } = req.body;

    // Hash password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      otherFields.password = hashedPassword;  // Use the hashed password
    }

    // If assignedClass is being updated, handle the class assignment logic
    if (assignedClass) {
      // First, remove the teacher from the old class (if any)
      const teacher = await teacherModel.findById(_id);
      if (teacher.assignedClass) {
        await classModel.findOneAndUpdate(
          { className: teacher.assignedClass },
          { $pull: { teachers: _id } }  // Remove the teacher from the old class
        );
      }

      // Now, add the teacher to the new class
      await classModel.findOneAndUpdate(
        { className: assignedClass },
        { $addToSet: { teachers: _id } }  // Add the teacher to the new class
      );
    }

    // Update the teacher document
    const updatedTeacher = await teacherModel.findByIdAndUpdate(
      _id,
      { ...otherFields, assignedClass }, // Update teacher with other fields and new assignedClass
      { new: true } // Return the updated teacher object
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({
      message: 'Teacher updated successfully!',
      data: updatedTeacher,
    });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: err.message });  // Send the full error message to the client
  }
};


// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { _id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Teacher ID format" });
    }

    const deletedTeacher = await teacherModel.findByIdAndDelete(_id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({
      message: 'Teacher deleted successfully!',
      data: deletedTeacher, // Optional: You can send back the deleted teacher data
    });
  } catch (err) {
    console.error(err); // Log the error in the server console
    res.status(500).json({ error: err.message }); // Send the full error message to the client
  }
};

// Signup (create a new teacher)
export const signupTeacher = async (req, res) => {
  try {
    const { name, gender, dob, contact, salary, assignedClass, email, password } = req.body;

    // Check if teacher already exists
    const existingTeacher = await teacherModel.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher with this email already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new teacherModel({
      name,
      gender,
      dob,
      contact,
      salary,
      assignedClass: assignedClass || null,
      email,
      password: hashedPassword,
    });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher registered successfully!", data: newTeacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login (authenticate teacher)
export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find teacher by email
    const teacher = await teacherModel.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful!",
      token, // Send token back to the client
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
