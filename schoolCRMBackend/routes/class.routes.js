import express from 'express';
import { addClass, getClasses, updateClass, deleteClass, getClassById } from '../controllers/class.controller.js';

const router = express.Router();

router.post('/add', addClass);
router.get('/display', getClasses);
router.put('/update/:_id', updateClass);
router.delete('/delete/:_id', deleteClass);

router.get('/find/:_id', getClassById)

export default router;
