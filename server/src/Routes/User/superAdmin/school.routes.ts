
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { schoolValidator } from '../../../Validations/school.validation';
import { schoolController } from '../../../Controllers/index.controller';



const schoolRouter = express.Router();


schoolRouter.post('/', validation(schoolValidator.createSchool), schoolController.createSchool);
schoolRouter.get('/:schoolId', validation(schoolValidator.getSchool), schoolController.getSchoolData);
schoolRouter.get('/', schoolController.getAllSchools);
schoolRouter.patch('/', validation(schoolValidator.updateSchool), schoolController.updateSchool);
schoolRouter.delete('/:schoolId', validation(schoolValidator.deleteSchool), schoolController.deleteSchool);



export default schoolRouter;