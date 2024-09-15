import express from 'express';

import validation from '../../Validations/validationHandler.validation';
import { lookupValidator } from '../../Validations/lookup.validation';
import lookupController from '../../Controllers/lookup.controller';



const lookups = express.Router();


lookups.post('/', validation(lookupValidator.createLookup), lookupController.createLookupsDetails);
lookups.get('/:lookups', lookupController.getLookups);
lookups.get('/user/data', lookupController.getUsersBySpecificData);



export default lookups;