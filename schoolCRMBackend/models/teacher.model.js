import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
      dob: { type: Date, required: true },
      contact: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, 'Contact number must be 10 digits.'] 
      },
      salary: { type: Number, required: true },
      assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null }, // Reference to Class
      email: { type: String, required: true, unique: true }, // Ensure email is unique
      password: { type: String, required: true }, // Add password field
    },
    { timestamps: true }
  );
  
  export const teacherModel = mongoose.model('Teacher', teacherSchema);