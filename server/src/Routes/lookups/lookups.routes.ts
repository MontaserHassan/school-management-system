import express from 'express';

import validation from '../../Validations/validationHandler.validation';
import { lookupValidator } from '../../Validations/lookup.validation';
import lookupController from '../../Controllers/lookup.controller';
import getUser from '../../Middlewares/auth.middleware';
import checkRole from '../../Middlewares/check-role.middleware';



const lookups = express.Router();


lookups.use(getUser());
lookups.post('/', checkRole(['superAdmin']), validation(lookupValidator.createLookup), lookupController.createLookupsDetails);
lookups.get('/:lookups', checkRole(['superAdmin', 'admin', 'director', 'teacher']), lookupController.getLookups);
lookups.get('/user/data', checkRole(['superAdmin', 'admin']), lookupController.getUsersBySpecificData);



export default lookups;