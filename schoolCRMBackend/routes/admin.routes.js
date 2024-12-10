import { Router } from 'express';
import { verifyToken } from '../authMiddleware.js';
import {
  addAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  signupAdmin
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/add', verifyToken, addAdmin); // Protected route
router.get('/all', verifyToken, getAdmins); // Protected route
router.put('/update/:id', verifyToken, updateAdmin); // Protected route
router.delete('/delete/:id', verifyToken, deleteAdmin); // Protected route
router.post('/login', loginAdmin); // Public route
router.post('/signup', signupAdmin); // Public route

export default router;
