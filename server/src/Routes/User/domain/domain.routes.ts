
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { domainController } from '../../../Controllers/index.controller';
import { domainValidator } from '../../../Validations/domain.validation';



const domainRouter = express.Router();


domainRouter.post('/', validation(domainValidator.createDomain), domainController.createDomain);

domainRouter.get('/', domainController.getAllDomain);
domainRouter.get('/:domainId', validation(domainValidator.getDomain), domainController.getDomainData);

domainRouter.patch('/', validation(domainValidator.updateDomain), domainController.updateDomainData);



export default domainRouter;