
import express from 'express';

import { userController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';


const authAdminRouter = express.Router();


// super Admin
authAdminRouter.use(checkRole(['director', 'admin', 'superAdmin']),);
authAdminRouter.post('',);



export default authAdminRouter;