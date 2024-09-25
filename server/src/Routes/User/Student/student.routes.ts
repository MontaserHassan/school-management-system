
import express from 'express';

import { studentController } from '../../../Controllers/index.controller';
import checkRole from '../../../Middlewares/check-role.middleware';
import { mediaMediaHandler } from '../../../Middlewares/media.middleware';
import { studentValidator } from '../../../Validations/student.validation';
import validation from '../../../Validations/validationHandler.validation';



const authStudentRouter = express.Router();


authStudentRouter.post('/', checkRole(['director', 'admin']), validation(studentValidator.createStudent), studentController.createStudent);
authStudentRouter.post('/add-data', checkRole(['director', 'admin']), validation(studentValidator.addMoreDataToStudent), studentController.addStudentToClass);

authStudentRouter.get('/', checkRole(['director', 'admin']), studentController.getAllStudents);
authStudentRouter.get('/:studentId', checkRole(['director', 'teacher', 'admin', 'parent']), studentController.getStudent);
authStudentRouter.get('/progress-history/:studentId', checkRole(['director', 'teacher', 'admin', 'parent']), validation(studentValidator.addProgressHistory), studentController.getProgressHistory);

authStudentRouter.patch('/attendance', checkRole(['teacher', 'director', 'admin']), validation(studentValidator.addAttendance), studentController.addAttendance);
authStudentRouter.patch('/comment', checkRole(['teacher', 'director', 'admin']), mediaMediaHandler, validation(studentValidator.addComment), studentController.addComment);
authStudentRouter.patch('/progress-status', checkRole(['teacher']), validation(studentValidator.addProgressHistory), studentController.addProgressStatus);
authStudentRouter.patch('/degree', checkRole(['teacher']), validation(studentValidator.addDegree), studentController.addDegreeOfTopic);



export default authStudentRouter;