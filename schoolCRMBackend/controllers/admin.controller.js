import { adminModel } from "../models/admin.model.js";

// Add a new admin
export const addAdmin = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Create a new admin object
    const newAdmin = new adminModel({
      name,
      email,
      password,
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
