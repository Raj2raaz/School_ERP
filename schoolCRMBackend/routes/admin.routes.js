import express from 'express';
import { addAdmin, getAdmins, updateAdmin, deleteAdmin, loginAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

// Admin routes
router.post('/add', addAdmin);            // Add a new admin
router.get('/display', getAdmins);         // Get all admins
router.put('/update/:id', updateAdmin);   // Update an admin by ID
router.delete('/delete/:id', deleteAdmin); // Delete an admin by ID

router.post('/login', loginAdmin)

export default router;


