import express from 'express';

import { addStudent, getStudents, updateStudent, deleteStudent,signupStudent, loginStudent, getStudentByEmail } from '../controllers/student.controller.js';
import { verifyToken } from '../authMiddleware.js';

const router = express.Router();

router.post('/add', verifyToken, addStudent);
router.get('/display', verifyToken, getStudents);
router.put('/update/:_id', verifyToken, updateStudent);
router.delete('/delete/:_id', verifyToken, deleteStudent);

router.post('/signup', signupStudent); // Student signup
router.post('/login', loginStudent);   // Student login
router.get('/find/:email', verifyToken, getStudentByEmail)

export default router;