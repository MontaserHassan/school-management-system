
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import ticketRouter from './Ticket/ticket.routes';



const authTicketRouter = express.Router();


authTicketRouter.use('/', ticketRouter);



export default authTicketRouter;