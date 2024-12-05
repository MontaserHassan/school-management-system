
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { educationDomainController } from '../../../Controllers/index.controller';
import { educationDomainValidator } from '../../../Validations/education-domain.validation';



const educationDomainRouter = express.Router();


educationDomainRouter.post('/', validation(educationDomainValidator.createEducationDomain), educationDomainController.createEducationDomain);

educationDomainRouter.get('/', educationDomainController.getAllEducationDomain);
educationDomainRouter.get('/:educationDomainId', validation(educationDomainValidator.getEducationDomain), educationDomainController.getEducationDomainData);
educationDomainRouter.get('/school/:schoolId', validation(educationDomainValidator.getEducationDomainBySchoolId), educationDomainController.getAllEducationDomainBySchoolId);

educationDomainRouter.patch('/', validation(educationDomainValidator.updateEducationDomain), educationDomainController.updateEducationDomainData);

educationDomainRouter.delete('/', validation(educationDomainValidator.deleteEducationDomain), educationDomainController.deleteEducationDomain);



export default educationDomainRouter;