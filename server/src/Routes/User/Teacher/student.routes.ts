
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { studentController } from '../../../Controllers/index.controller';
import { studentValidator } from '../../../Validations/student.validation';
import { mediaMediaHandler } from '../../../Middlewares/media.middleware';



const studentRouter = express.Router();


studentRouter.get('/', studentController.getAllStudents);
studentRouter.get('/class-room', studentController.getStudentsOfClassRoom);
studentRouter.get('/:studentId', studentController.getStudent);
studentRouter.patch('/progress-history', validation(studentValidator.addProgressHistory), studentController.addProgressHistory);
studentRouter.patch('/attendance', validation(studentValidator.addAttendance), studentController.addAttendance);
studentRouter.patch('/comment', mediaMediaHandler, validation(studentValidator.addComment), studentController.addComment);
studentRouter.patch('/degree', validation(studentValidator.addDegree), studentController.addDegreeOfSubject);




export default studentRouter;