
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { domainController } from '../../../Controllers/index.controller';
import { domainValidator } from '../../../Validations/domain.validation';
import checkRole from '../../Middlewares/check-role.middleware';



const domainRouter = express.Router();


domainRouter.post('/', checkRole(['admin', 'director']), validation(domainValidator.createDomain), domainController.createDomain);

domainRouter.get('/', checkRole(['admin', 'director']), domainController.getAllDomain);
domainRouter.get('/:domainId', validation(domainValidator.getDomain), domainController.getDomainData);

domainRouter.patch('/', checkRole(['admin', 'director']), validation(domainValidator.updateDomain), domainController.updateDomainData);



export default domainRouter;