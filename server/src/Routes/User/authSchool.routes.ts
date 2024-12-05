
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import schoolRouter from './school/school.routes';



const authSchoolRouter = express.Router();


authSchoolRouter.use(checkRole(['superAdmin', 'admin', 'director', 'teacher', 'parent']),);
authSchoolRouter.use('/', schoolRouter);



export default authSchoolRouter;