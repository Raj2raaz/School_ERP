import express from 'express';
import { addTeacher, getTeachers, updateTeacher, deleteTeacher } from '../controllers/teacher.controller.js';

const router = express.Router();

router.post('/add', addTeacher);
router.get('/display', getTeachers);
router.put('/update/:id', updateTeacher);
router.delete('/delete/:id', deleteTeacher);

export default router;
