
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { schoolValidator } from '../../../Validations/school.validation';
import { schoolController } from '../../../Controllers/index.controller';
import checkRole from '../../../Middlewares/check-role.middleware';



const schoolRouter = express.Router();


schoolRouter.post('/', checkRole(['superAdmin',]), validation(schoolValidator.createSchool), schoolController.createSchool);
schoolRouter.get('/:schoolId', validation(schoolValidator.getSchool), schoolController.getSchoolData);
schoolRouter.get('/', checkRole(['superAdmin',]), schoolController.getAllSchools);
schoolRouter.patch('/', checkRole(['superAdmin',]), validation(schoolValidator.updateSchool), schoolController.updateSchool);
schoolRouter.delete('/:schoolId', checkRole(['superAdmin',]), validation(schoolValidator.deleteSchool), schoolController.deleteSchool);



export default schoolRouter;