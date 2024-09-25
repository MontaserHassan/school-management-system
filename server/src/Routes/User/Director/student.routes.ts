
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { studentValidator } from '../../../Validations/student.validation';
import studentController from '../../../Controllers/student.controller';
import checkRole from '../../../Middlewares/check-role.middleware';



const studentRouter = express.Router();


studentRouter.post('/', checkRole(['director', 'admin']), validation(studentValidator.createStudent), studentController.createStudent);
studentRouter.post('/add-data', checkRole(['director', 'admin']), validation(studentValidator.addMoreDataToStudent), studentController.addStudentToClass);
studentRouter.get('/', checkRole(['director', 'admin']), studentController.getAllStudents);
studentRouter.get('/:studentId', validation(studentValidator.getStudent), studentController.getStudent);
// studentRouter.patch('/', validation(studentValidator.updateStudentData), studentController.updateStudentData)
// studentRouter.delete('/:studentCode', validation(studentValidator.deleteStudent), studentController.deleteStudent)



export default studentRouter;