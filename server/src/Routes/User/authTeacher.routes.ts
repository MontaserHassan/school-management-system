
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import topicRouter from './Teacher/topic.routes';
import degreeRouter from './Teacher/degree.routes';



const authTeacherRouter = express.Router();


authTeacherRouter.use(checkRole(['teacher']));
authTeacherRouter.use('/topic', topicRouter);
authTeacherRouter.use('/degree', degreeRouter);



export default authTeacherRouter;