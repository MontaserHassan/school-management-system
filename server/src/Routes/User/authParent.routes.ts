
import express from 'express';

import { progressHistoryController, studentController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';
import validation from '../../Validations/validationHandler.validation';
import { studentValidator } from '../../Validations/student.validation';


const authParentRouter = express.Router();


authParentRouter.use(checkRole(['parent']));
authParentRouter.get('/', studentController.getStudentsByParent);



export default authParentRouter;