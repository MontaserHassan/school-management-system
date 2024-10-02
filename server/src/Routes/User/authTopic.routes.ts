
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import topicRouter from './Topic/topic.routes';



const authTopicRouter = express.Router();


authTopicRouter.use(checkRole(['director', 'admin', 'teacher']),);
authTopicRouter.use('/topic', topicRouter);



export default authTopicRouter;