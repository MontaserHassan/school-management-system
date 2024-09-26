
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { classRoomController } from '../../../Controllers/index.controller';
import { classRoomValidator } from '../../../Validations/class-room.validation';



const classRoomRouter = express.Router();


// classRoomRouter.post('/addStudent', validation(classRoomValidator.addStudents), classRoomController.addStudent);
// classRoomRouter.patch('/update-class', validation(classRoomValidator.addTeacher), classRoomController.updateClassRoom);
// classRoomRouter.delete('/:classRoom', validation(classRoomValidator.deleteRoom), classRoomController.deleteClassRoom);



export default classRoomRouter;