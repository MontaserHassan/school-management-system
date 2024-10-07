
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { ticketController } from '../../../Controllers/index.controller';
import { ticketValidator } from '../../../Validations/ticket.validation';



const ticketRouter = express.Router();


ticketRouter.get('/', ticketController.getTickets);
ticketRouter.get('/:ticketId', validation(ticketValidator.getTicket), ticketController.getTicket);

ticketRouter.post('/', validation(ticketValidator.createTicket), ticketController.createTicket);
ticketRouter.post('/mail', validation(ticketValidator.sendMail), ticketController.sendMail);



export default ticketRouter;