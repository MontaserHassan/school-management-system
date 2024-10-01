import express from 'express';

import { classRoomController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { classRoomValidator } from '../../../Validations/class-room.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const classRoomRouter = express.Router();


classRoomRouter.get('/', classRoomController.getAllRoom);
classRoomRouter.get('/:classRoom', validation(classRoomValidator.getRoom), classRoomController.getClassById);

classRoomRouter.post('/', checkRole(['director', 'admin']), validation(classRoomValidator.createClassRoom), classRoomController.createClassRoom);

classRoomRouter.patch('/', checkRole(['director', 'admin']), validation(classRoomValidator.updateClassRoom), classRoomController.updateClassRoom);

classRoomRouter.patch('/unAssign-student', checkRole(['admin', 'director']), validation(classRoomValidator.deleteStudentFromClassRoom), classRoomController.deleteStudentFromClassRoom);

classRoomRouter.delete('/:room', checkRole(['admin']), validation(classRoomValidator.deleteRoom), classRoomController.deleteClassRoom);



export default classRoomRouter;