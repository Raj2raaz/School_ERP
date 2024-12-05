import { teacherModel } from '../models/teacher.model.js';

// Add a new teacher
export const addTeacher = async (req, res) => {
  try {
    const newTeacher = new teacherModel(req.body);
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

// Update a teacher
export const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await teacherModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated teacher
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher updated successfully!', data: updatedTeacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await teacherModel.findByIdAndDelete(req.params.id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
