
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import topicRouter from './Topic/topic.routes';



const authTeacherRouter = express.Router();


authTeacherRouter.use(checkRole(['director', 'admin', 'teacher']),);
authTeacherRouter.use('/topic', topicRouter);



export default authTeacherRouter;