
import express from 'express';

import { groupController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { groupValidator } from '../../../Validations/group.validation';



const groupRouter = express.Router();


groupRouter.get('/', groupController.getGroups);
groupRouter.get('/:groupId', validation(groupValidator.getGroups), groupController.getGroup);



export default groupRouter;