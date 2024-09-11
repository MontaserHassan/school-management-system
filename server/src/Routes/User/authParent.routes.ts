
import express from 'express';

import { userController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';


const authParentRouter = express.Router();


// parent
authParentRouter.use(checkRole(['parent']));



export default authParentRouter;