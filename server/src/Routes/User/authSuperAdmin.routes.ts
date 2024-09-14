
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import schoolRouter from './superAdmin/school.routes';



const authSuperAdminRouter = express.Router();



// super Admin
authSuperAdminRouter.use(checkRole(['superAdmin']));
authSuperAdminRouter.use('/school', schoolRouter);



export default authSuperAdminRouter;