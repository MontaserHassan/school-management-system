import express from 'express';

import { classRoomController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { classRoomValidator } from '../../../Validations/class-room.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const classRoomRouter = express.Router();


classRoomRouter.post('/', checkRole(['director', 'admin']), validation(classRoomValidator.createClassRoom), classRoomController.createClassRoom);
classRoomRouter.get('/', classRoomController.getAllRoom);
classRoomRouter.get('/:classRoom', checkRole(['director', 'admin', 'teacher']), validation(classRoomValidator.getRoom), classRoomController.getClassById);



export default classRoomRouter;