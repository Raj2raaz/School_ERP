import { adminModel } from "../models/admin.model.js";

import dotenv from 'dotenv';

// import bcrypt from 'bcryptjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
// Add a new admin
export const addAdmin = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Check if an admin with the provided email already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin object
    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
      contact,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin added successfully!", data: newAdmin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find();

    res.status(200).json({ message: "Admins fetched successfully!", data: admins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated admin object
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully!", data: updatedAdmin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await adminModel.findByIdAndDelete(req.params.id);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};
