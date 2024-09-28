
import express from 'express';

import { studentController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';


const authParentRouter = express.Router();


authParentRouter.use(checkRole(['parent', 'director', 'admin']));
authParentRouter.get('/:parentId', studentController.getStudentsByParent);



export default authParentRouter;