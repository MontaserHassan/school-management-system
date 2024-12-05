
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { educationDomainController } from '../../../Controllers/index.controller';
import { educationDomainValidator } from '../../../Validations/education-domain.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const educationDomainRouter = express.Router();


educationDomainRouter.post('/', checkRole(['superAdmin',]), validation(educationDomainValidator.createEducationDomain), educationDomainController.createEducationDomain);

educationDomainRouter.get('/', educationDomainController.getAllEducationDomain);
educationDomainRouter.get('/:educationDomainId', validation(educationDomainValidator.getEducationDomain), educationDomainController.getEducationDomainData);

educationDomainRouter.patch('/', checkRole(['superAdmin',]), validation(educationDomainValidator.updateEducationDomain), educationDomainController.updateEducationDomainData);

educationDomainRouter.delete('/', checkRole(['superAdmin',]), validation(educationDomainValidator.deleteEducationDomain), educationDomainController.deleteEducationDomain);



export default educationDomainRouter;