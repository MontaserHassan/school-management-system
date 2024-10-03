
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import invoiceSchoolRouter from './Invoices/invoice-school.routes';
import invoiceStudentRouter from './Invoices/invoice-student.routes';



const authInvoiceRouter = express.Router();


authInvoiceRouter.use(checkRole(['superAdmin', 'director', 'admin', 'parent']),);
authInvoiceRouter.use('/school', invoiceSchoolRouter);
authInvoiceRouter.use('/student', invoiceStudentRouter);



export default authInvoiceRouter;