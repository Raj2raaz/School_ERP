import express from 'express';
import { addTeacher, getTeachers, updateTeacher, deleteTeacher, signupTeacher, loginTeacher, getTeacherById } from '../controllers/teacher.controller.js';

const router = express.Router();

router.post('/add', addTeacher);
router.get('/display', getTeachers);
router.put('/update/:_id', updateTeacher);
router.delete('/delete/:_id', deleteTeacher);
router.get('/find/:_id', getTeacherById);

router.post('/signup', signupTeacher);
router.post('/login', loginTeacher);

export default router;
