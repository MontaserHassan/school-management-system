
import express from 'express';

import { studentController, userController } from '../../Controllers/index.controller';
import checkRole from '../../Middlewares/check-role.middleware';
import validation from '../../Validations/validationHandler.validation';
import { userValidator } from '../../Validations/user.validation';



const authUserRouter = express.Router();


authUserRouter.get('/profile', userController.getProfile);
authUserRouter.get('/user-list', userController.getAllUsers);
authUserRouter.get('/student-data/:studentCode', studentController.getStudent);
authUserRouter.get('/parents', checkRole(['director', 'admin']), userController.getAllParents);

authUserRouter.post('/register', checkRole(['director', 'admin']), validation(userValidator.registerUser), userController.registerUser);
authUserRouter.post('/add-parent', checkRole(['director', 'admin']), validation(userValidator.addParent), userController.addParent);
authUserRouter.post('/logout', userController.logoutUser);

authUserRouter.patch('/', validation(userValidator.updateUser), userController.updateUser);
authUserRouter.patch('/update-password', checkRole(['superAdmin', 'admin']), validation(userValidator.updatePassword), userController.updateUserPassword);



export default authUserRouter;