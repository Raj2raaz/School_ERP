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
    
    res.status(201).json({ message: "Admin added successfully!"});
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

// login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    // Send response with token and admin details
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        contact: admin.contact, // Add other fields you want to include
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

export const signupAdmin = async (req, res) => {
  const { name, email, password, contact } = req.body;

  try {
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

    // Generate JWT token for the new admin
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    // Send the token and admin details as part of the response
    res.status(201).json({
      message: "Admin signup successful",
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        contact: newAdmin.contact,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "An error occurred during signup" });
  }
};
