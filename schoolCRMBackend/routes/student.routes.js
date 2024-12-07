import express from 'express';

import { addStudent, getStudents, updateStudent, deleteStudent,signupStudent, loginStudent } from '../controllers/student.controller.js';

const router = express.Router();

router.post('/add', addStudent);
router.get('/display', getStudents);
router.put('/update/:_id', updateStudent);
router.delete('/delete/:_id', deleteStudent);

router.post('/signup', signupStudent); // Student signup
router.post('/login', loginStudent);   // Student login

export default router;