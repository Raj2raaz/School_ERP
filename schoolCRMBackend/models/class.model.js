import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
      className: { type: String, required: true, unique: true }, // e.g., "10A"
      year: { type: Number, required: true }, // Academic year, e.g., 2024
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null }, // Reference to the Teacher model
      studentFees: { type: Number, required: true }, // Fee amount per student
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null }], // List of students
    },
    { timestamps: true }
  );
  
  export const classModel = mongoose.model('Class', classSchema);