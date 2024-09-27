
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import subjectRouter from './subject/subject.routes';



const authSubjectRouter = express.Router();


authSubjectRouter.use(checkRole(['director', 'admin']),);
authSubjectRouter.use('/', subjectRouter);



export default authSubjectRouter;