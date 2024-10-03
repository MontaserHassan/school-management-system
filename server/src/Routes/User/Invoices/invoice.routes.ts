
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { invoiceController } from '../../../Controllers/index.controller';
import { invoiceValidator } from '../../../Validations/invoice.validation';



const invoiceRouter = express.Router();


invoiceRouter.get('/', invoiceController.getInvoices);
invoiceRouter.get('/:invoiceId', invoiceController.getInvoice);

invoiceRouter.post('/', validation(invoiceValidator.createInvoice), invoiceController.createInvoice);

invoiceRouter.patch('/', validation(invoiceValidator.updateInvoice), invoiceController.updateInvoice);



export default invoiceRouter;