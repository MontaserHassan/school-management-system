
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import topicRouter from './Teacher/topic.routes';



const authTeacherRouter = express.Router();


authTeacherRouter.use(checkRole(['director', 'admin', 'superAdmin', 'teacher']),);
authTeacherRouter.use('/topic', topicRouter);



export default authTeacherRouter;