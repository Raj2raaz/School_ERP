// import express from 'express';
// import { addAdmin, getAdmins, updateAdmin, deleteAdmin, loginAdmin } from '../controllers/admin.controller.js';

// const router = express.Router();

// // Admin routes
// router.post('/add', addAdmin);            // Add a new admin
// router.get('/display', getAdmins);         // Get all admins
// router.put('/update/:id', updateAdmin);   // Update an admin by ID
// router.delete('/delete/:id', deleteAdmin); // Delete an admin by ID

// router.post('/login', loginAdmin)

// export default router;


import { Router } from 'express';
import { verifyToken } from '../authMiddleware.js';
import {
  addAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  loginAdmin
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/add', verifyToken, addAdmin); // Protected route
router.get('/all', verifyToken, getAdmins); // Protected route
router.put('/update/:id', verifyToken, updateAdmin); // Protected route
router.delete('/delete/:id', verifyToken, deleteAdmin); // Protected route
router.post('/login', loginAdmin); // Public route

export default router;
