
import express from 'express';

import { eventController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { eventValidator } from '../../../Validations/event.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const eventRouter = express.Router();


eventRouter.post('/', checkRole(['admin', 'director']), validation(eventValidator.createEvent), eventController.createEvent);

eventRouter.get('/', eventController.getEventsForUser);
eventRouter.get('/:eventId', validation(eventValidator.getEvent), eventController.getEventById);

// eventRouter.patch('/', validation(eventValidator.updateEvent), eventController.updateEventResponse);
eventRouter.patch('/update-response', validation(eventValidator.updateResponse), eventController.updateEventResponse);



export default eventRouter;