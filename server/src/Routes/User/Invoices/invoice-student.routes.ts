
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { studentInvoiceController } from '../../../Controllers/index.controller';
import { studentInvoiceValidator } from '../../../Validations/invoice-student.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const invoiceStudentRouter = express.Router();


invoiceStudentRouter.get('/', checkRole(['director', 'parent', 'admin']), studentInvoiceController.getInvoices);
invoiceStudentRouter.get('/:invoiceId', checkRole(['director', 'parent', 'admin']), validation(studentInvoiceValidator.getStudentInvoice), studentInvoiceController.getInvoice);

invoiceStudentRouter.post('/', checkRole(['director', 'admin']), validation(studentInvoiceValidator.createStudentInvoice), studentInvoiceController.createInvoice);

invoiceStudentRouter.patch('/', checkRole(['director', 'admin']), validation(studentInvoiceValidator.updateStudentInvoice), studentInvoiceController.updateInvoice);



export default invoiceStudentRouter;