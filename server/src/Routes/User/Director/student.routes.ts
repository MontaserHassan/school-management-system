
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { studentValidator } from '../../../Validations/student.validation';
import studentController from '../../../Controllers/student.controller';



const studentRouter = express.Router();


studentRouter.post('/', validation(studentValidator.createStudent), studentController.createStudent);
studentRouter.post('/add-data', validation(studentValidator.addMoreDataToStudent), studentController.addStudentToClass);
studentRouter.get('/', studentController.getAllStudents);
studentRouter.get('/:studentId', validation(studentValidator.getStudent), studentController.getStudent);
// studentRouter.patch('/', validation(studentValidator.updateStudentData), studentController.updateStudentData)
// studentRouter.delete('/:studentCode', validation(studentValidator.deleteStudent), studentController.deleteStudent)



export default studentRouter;