
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { schoolInvoiceController } from '../../../Controllers/index.controller';
import { schoolInvoiceValidator } from '../../../Validations/invoice-school.validation';



const invoiceSchoolRouter = express.Router();


invoiceSchoolRouter.get('/', schoolInvoiceController.getInvoices);
invoiceSchoolRouter.get('/:invoiceId', validation(schoolInvoiceValidator.getSchoolInvoice), schoolInvoiceController.getInvoice);

invoiceSchoolRouter.post('/', validation(schoolInvoiceValidator.createSchoolInvoice), schoolInvoiceController.createInvoice);

invoiceSchoolRouter.patch('/', validation(schoolInvoiceValidator.updateSchoolInvoice), schoolInvoiceController.updateInvoice);



export default invoiceSchoolRouter;