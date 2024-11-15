
import express from 'express';

import { groupController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { groupValidator } from '../../../Validations/group.validation';



const eventRouter = express.Router();


eventRouter.post('/', groupController.createGroup);

eventRouter.get('/', groupController.getGroups);
eventRouter.get('/:groupId', validation(groupValidator.getGroup), groupController.getGroup);
eventRouter.get('/classes/:groupId', validation(groupValidator.getClassesByGroupId), groupController.getClasses);



export default eventRouter;