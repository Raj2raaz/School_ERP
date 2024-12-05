import { classModel } from '../models/class.model.js';
import { teacherModel } from '../models/teacher.model.js';

// Add a new class
export const addClass = async (req, res) => {
  try {
    const { className, year, teacher, studentFees, studentList } = req.body;

    // Ensure the teacher exists
    if (teacher) {
      const teacherExists = await teacherModel.findById(teacher);
      if (!teacherExists) {
        return res.status(400).json({ error: 'Teacher not found' });
      }
    }

    const newClass = new classModel({ className, year, teacher, studentFees, studentList });
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
      .populate('teacher', 'name') // Populate teacher details (only name field)
      .populate('studentList', 'name'); // Populate student details (only name field)

    res.status(200).json({ message: 'Classes fetched successfully!', data: classes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a class
export const updateClass = async (req, res) => {
  try {
    const { className, year, teacher, studentFees, studentList } = req.body;

    // Ensure the teacher exists if provided
    if (teacher) {
      const teacherExists = await teacherModel.findById(teacher);
      if (!teacherExists) {
        return res.status(400).json({ error: 'Teacher not found' });
      }
    }

    const updatedClass = await classModel.findByIdAndUpdate(
      req.params.id,
      { className, year, teacher, studentFees, studentList },
      { new: true } // Return the updated class object
    );

    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class updated successfully!', data: updatedClass });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const deletedClass = await classModel.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ message: 'Class deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
