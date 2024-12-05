import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },  // Admin email (unique)
  password: { type: String, required: true },              // Admin password
  role: { type: String, default: "admin" },                 // Default role as admin
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Contact number must be 10 digits.'],
  },
  // You can add additional fields like address, permissions, etc.
}, { timestamps: true });

export const adminModel = mongoose.model('Admin', adminSchema);
