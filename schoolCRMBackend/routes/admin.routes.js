import express from 'express';
import { addAdmin, getAdmins, updateAdmin, deleteAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

// Admin routes
router.post('/add', addAdmin);            // Add a new admin
router.get('/display', getAdmins);         // Get all admins
router.put('/update/:id', updateAdmin);   // Update an admin by ID
router.delete('/delete/:id', deleteAdmin); // Delete an admin by ID

export default router;
