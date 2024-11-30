
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { domainController, schoolController } from '../../../Controllers/index.controller';
import { domainValidator } from '../../../Validations/domain.validation';
import { schoolValidator } from '../../../Validations/school.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const verifySchoolRouter = express.Router();


verifySchoolRouter.post('/create-domain', checkRole(['admin']), validation(domainValidator.createDomain), domainController.createDomain);
verifySchoolRouter.post('/domain-cycle', checkRole(['superAdmin']), validation(schoolValidator.addDomainToCycle), schoolController.addDomainToCycle);

verifySchoolRouter.patch('/', checkRole(['superAdmin']), validation(schoolValidator.verifySchool), schoolController.verifySchool);



export default verifySchoolRouter;