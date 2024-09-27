
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
// import invoiceRouter from './Director/invoice.routes';



const authDirectorRouter = express.Router();


authDirectorRouter.use(checkRole(['director', 'admin', 'superAdmin']),);
// authDirectorRouter.use('/invoice', invoiceRouter);



export default authDirectorRouter;