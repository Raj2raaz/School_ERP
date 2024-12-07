import { classModel } from '../models/class.model.js';
import { teacherModel } from '../models/teacher.model.js';
import { studentModel } from '../models/student.model.js';
import mongoose from 'mongoose';
// Add a new class
export const addClass = async (req, res) => {
  try {
    const { className, year, teacher, studentFees, students } = req.body;

    // Validate className
    if (!className || className.trim() === '') {
      return res.status(400).json({ error: 'Class name is required and cannot be empty' });
    }

    // Ensure the teacher exists
    if (teacher) {
      const teacherExists = await teacherModel.findById(teacher);
      if (!teacherExists) {
        return res.status(400).json({ error: 'Teacher not found' });
      }
    }

    // Ensure the student IDs in students are valid
    if (students && students.length > 0) {
      const studentsExist = await studentModel.find({ '_id': { $in: students } });
      console.log('Students found:', studentsExist);
      if (studentsExist.length !== students.length) {
        return res.status(400).json({ error: 'One or more student IDs are invalid' });
      }
    }

    // Create and save the class
    const newClass = new classModel({
      className,
      year,
      teacher,
      studentFees,
      students: students // Assign student list to the class
    });

    await newClass.save();

    res.status(201).json({ message: 'Class added successfully!', data: newClass });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await classModel.find()
      .populate('teacher', 'name salary') // Populate teacher details 
      .populate('students', 'name email'); // Populate student details (only name field)

    // console.log('Classes fetched:', classes);  // Log the classes to inspect the data
    
    res.status(200).json({ message: 'Classes fetched successfully!', data: classes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// find one 
export const getClassById = async (req, res) => {
  const { _id } = req.params; // Extract class ID from request parameters

  try {
    // Find the class by ID and populate the teacher and students fields
    const classData = await classModel.findById(_id)
      .populate('teacher', 'name salary') // Populate teacher details 
      .populate('students', 'name email gender feesPaid'); // Populate student details

    if (!classData) {
      return res.status(404).json({ error: 'Class not found!' });
    }

    res.status(200).json({ message: 'Class fetched successfully!', data: classData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update a class
export const updateClass = async (req, res) => {
  try {
    const { _id } = req.params; // Get the class ID from the request params

    // Validate the ObjectId format for the class ID
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Class ID format" });
    }

    // Ensure the teacher exists if provided
    if (req.body.teacher) {
      const teacherExists = await teacherModel.findById(req.body.teacher);
      if (!teacherExists) {
        return res.status(400).json({ error: 'Teacher not found' });
      }
    }

    // Perform the class update operation directly with req.body
    const updatedClass = await classModel.findByIdAndUpdate(
      _id,
      req.body, // Use req.body directly to update the class
      { new: true } // Return the updated class object
    );

    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class updated successfully!', data: updatedClass });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message }); // Return the full error message to the client
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const { _id } = req.params; // Get the class ID from the request params

    // Validate the ObjectId format for the class ID
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Class ID format" });
    }

    // Perform the class deletion
    const deletedClass = await classModel.findByIdAndDelete(_id);

    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class deleted successfully!' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message }); // Return the full error message to the client
  }
};