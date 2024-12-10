import express from 'express';
import { addTeacher, getTeachers, updateTeacher, deleteTeacher, signupTeacher, loginTeacher, getTeacherById } from '../controllers/teacher.controller.js';
import { verifyToken } from '../authMiddleware.js';

const router = express.Router();

router.post('/add', verifyToken, addTeacher);
router.get('/display', verifyToken, getTeachers);
router.put('/update/:_id', verifyToken, updateTeacher);
router.delete('/delete/:_id', verifyToken, deleteTeacher);
router.get('/find/:_id',verifyToken, getTeacherById);

router.post('/signup', signupTeacher);
router.post('/login', loginTeacher);

export default router;
