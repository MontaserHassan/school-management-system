
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { schoolInvoiceController } from '../../../Controllers/index.controller';
import { schoolInvoiceValidator } from '../../../Validations/invoice-school.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const invoiceSchoolRouter = express.Router();


invoiceSchoolRouter.get('/', checkRole(['superAdmin', 'admin']), schoolInvoiceController.getInvoices);
invoiceSchoolRouter.get('/:invoiceId', checkRole(['superAdmin', 'admin']), validation(schoolInvoiceValidator.getSchoolInvoice), schoolInvoiceController.getInvoice);

invoiceSchoolRouter.post('/', validation(schoolInvoiceValidator.createSchoolInvoice), schoolInvoiceController.createInvoice);

invoiceSchoolRouter.patch('/', validation(schoolInvoiceValidator.updateSchoolInvoice), schoolInvoiceController.updateInvoice);



export default invoiceSchoolRouter;