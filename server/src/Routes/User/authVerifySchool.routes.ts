
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import verifySchoolRouter from './verifySchool/verify-school.routes';



const authVerifySchoolRouter = express.Router();


authVerifySchoolRouter.use(checkRole(['superAdmin', 'admin']),);
authVerifySchoolRouter.use('/', verifySchoolRouter);



export default authVerifySchoolRouter;