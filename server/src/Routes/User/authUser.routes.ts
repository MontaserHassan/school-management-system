
import express from 'express';

import { studentController, userController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';
import validation from '../../Validations/validationHandler.validation';
import { userValidator } from '../../Validations/user.validation';



const authUserRouter = express.Router();


authUserRouter.get('/profile', userController.getProfile);
authUserRouter.get('/', userController.getAllUsers);
authUserRouter.get('/student-data/:studentCode', studentController.getStudent);
authUserRouter.post('/logout', userController.logoutUser);

authUserRouter.post('/register', checkRole(['director', 'admin', 'superAdmin']), validation(userValidator.registerUser), userController.registerUser);



export default authUserRouter;