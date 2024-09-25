
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import classRoomRouter from './ClassRoom/class-room.routes';



const authClassRoomRouter = express.Router();


authClassRoomRouter.use(checkRole(['director', 'teacher', 'admin']),);
authClassRoomRouter.use('/', classRoomRouter);



export default authClassRoomRouter;