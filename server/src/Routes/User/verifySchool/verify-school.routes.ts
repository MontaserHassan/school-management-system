
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { schoolController } from '../../../Controllers/index.controller';
import { schoolValidator } from '../../../Validations/school.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const verifySchoolRouter = express.Router();


verifySchoolRouter.post('/domain-cycle', checkRole(['superAdmin']), validation(schoolValidator.addDomainToCycle), schoolController.addDomainToCycle);

verifySchoolRouter.patch('/', checkRole(['superAdmin']), validation(schoolValidator.verifySchool), schoolController.verifySchool);



export default verifySchoolRouter;