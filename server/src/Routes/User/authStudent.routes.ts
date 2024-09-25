
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import studentRouter from './Student/student.routes';



const authStudentRouter = express.Router();


authStudentRouter.use(checkRole(['director', 'admin', 'teacher', 'parent']),);
authStudentRouter.use('/', studentRouter);



export default authStudentRouter;