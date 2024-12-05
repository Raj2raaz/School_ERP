import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './db/dbConfig.js';
import studentRoutes from './routes/student.routes.js';
import teacherRoutes from './routes/teacher.routes.js'
import classRoutes from './routes/class.routes.js'
import adminRoutes from './routes/admin.routes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ;

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/classes', classRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server running on port ${PORT}`)
});
