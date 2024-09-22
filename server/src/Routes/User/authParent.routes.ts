
import express from 'express';

import { progressHistoryController, studentController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';
import validation from '../../Validations/validationHandler.validation';
import { studentValidator } from '../../Validations/student.validation';


const authParentRouter = express.Router();


// parent
authParentRouter.use(checkRole(['parent']));
authParentRouter.get('/:studentId', validation(studentValidator.getStudent), studentController.getStudent);
authParentRouter.get('/progress-history/:studentId', validation(studentValidator.getStudent), progressHistoryController.getStudentProgressHistory);




export default authParentRouter;