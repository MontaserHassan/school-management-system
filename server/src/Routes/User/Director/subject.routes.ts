
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { subjectController } from '../../../Controllers/index.controller';
import { subjectValidator } from '../../../Validations/subject.validation';



const subjectRouter = express.Router();


subjectRouter.post('/', validation(subjectValidator.createSubject), subjectController.createSubject);
subjectRouter.get('/', subjectController.getAllSubject);
subjectRouter.get('/:subjectId', validation(subjectValidator.getSubject), subjectController.getSubjectData);
subjectRouter.delete('/:subjectId', validation(subjectValidator.deleteSubject), subjectController.deleteSubject)



export default subjectRouter;