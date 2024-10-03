
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import invoiceRouter from './Invoices/invoice.routes';



const authInvoiceRouter = express.Router();


authInvoiceRouter.use(checkRole(['superAdmin', 'director', 'admin', 'parent']),);
authInvoiceRouter.use('/', invoiceRouter);



export default authInvoiceRouter;