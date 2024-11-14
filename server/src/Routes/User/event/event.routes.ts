
import express from 'express';

import { eventController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import checkRole from 'Middlewares/check-role.middleware';



const eventRouter = express.Router();


eventRouter.post('/', checkRole(['admin', 'director']), eventController.createEvent);

eventRouter.get('/', eventController.getEventsForUser);
eventRouter.get('/:eventId', eventController.getEventById);

eventRouter.patch('/', eventController.updateEventResponse);


export default eventRouter;