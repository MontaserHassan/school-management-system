
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import subjectRouter from './Director/subject.routes';
import studentRouter from './Director/student.routes';
// import invoiceRouter from './Director/invoice.routes';
import classRoomRouter from './Director/class-room.routes';



const authDirectorRouter = express.Router();


authDirectorRouter.use(checkRole(['director', 'admin', 'superAdmin']),);
authDirectorRouter.use('/subject', subjectRouter);
authDirectorRouter.use('/class-room', classRoomRouter);
authDirectorRouter.use('/student', studentRouter);
// authDirectorRouter.use('/invoice', invoiceRouter);



export default authDirectorRouter;