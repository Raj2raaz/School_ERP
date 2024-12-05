import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  dob: { type: Date, required: true },
  contact: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, 'Contact number must be 10 digits.'] 
  },
  feesPaid: { type: Boolean, default: false }, 
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null },   // i have to add in fields
  email: { type: String, required: true, unique: true }, // Add email
  password: { type: String, required: true }, // Add password
},{ timestamps: true });

export const studentModel = mongoose.model('Student', studentSchema);


