
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { classRoomController } from '../../../Controllers/index.controller';
import { classRoomValidator } from '../../../Validations/class-room.validation';



const classRoomRouter = express.Router();


classRoomRouter.post('/', validation(classRoomValidator.createClassRoom), classRoomController.createClassRoom);
classRoomRouter.post('/addStudent', validation(classRoomValidator.addStudents), classRoomController.addStudent);
classRoomRouter.get('/', classRoomController.getAllRoom);
classRoomRouter.get('/:classRoom', validation(classRoomValidator.getRoom), classRoomController.getClassById);
// classRoomRouter.get('/className/:classRoom', validation(classRoomValidator.getRoom), classRoomController.getClassByRoom);
classRoomRouter.delete('/:classRoom', validation(classRoomValidator.deleteRoom), classRoomController.deleteClassRoom);



export default classRoomRouter;