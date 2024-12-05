import express from 'express';
import { addClass, getClasses, updateClass, deleteClass } from '../controllers/class.controller.js';

const router = express.Router();

router.post('/add', addClass);
router.get('/display', getClasses);
router.put('/update/:id', updateClass);
router.delete('/delete/:id', deleteClass);

export default router;
