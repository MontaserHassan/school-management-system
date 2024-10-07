
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import notificationRouter from './notification/notification.routes';



const authNotificationRouter = express.Router();


authNotificationRouter.use(checkRole(['admin',]),);
authNotificationRouter.use('/', notificationRouter);



export default authNotificationRouter;