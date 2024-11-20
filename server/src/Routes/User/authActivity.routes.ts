
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import activityRouter from './activity/activity.routes';



const authActivityRouter = express.Router();


authActivityRouter.use(checkRole(['teacher',]),);
authActivityRouter.use('/', activityRouter);



export default authActivityRouter;