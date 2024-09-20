
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import topicRouter from './Teacher/topic.routes';
import studentRouter from './Teacher/student.routes';



const authTeacherRouter = express.Router();


authTeacherRouter.use(checkRole(['director', 'admin', 'superAdmin', 'teacher']),);
authTeacherRouter.use('/topic', topicRouter);
authTeacherRouter.use('/student', studentRouter);



export default authTeacherRouter;