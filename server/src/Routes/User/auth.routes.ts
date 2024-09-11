
import express from 'express';

import { userController } from '../../Controllers/index.controller';
import validation from '../../Validations/validationHandler.validation';
import { userValidator } from '../../Validations/user.validation';



const authRouter = express.Router();


authRouter.post('/login', validation(userValidator.loginUser), userController.loginUser);
authRouter.post('/add-password', validation(userValidator.addPassword), userController.addPassword);

authRouter.post('/register', validation(userValidator.registerUser), userController.registerUser);


export default authRouter;