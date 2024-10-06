
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { topicController } from '../../../Controllers/index.controller';
import { topicValidator } from '../../../Validations/topic.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const topicRouter = express.Router();


// topicRouter.get('/', getِAllTicketByUserId);
topicRouter.get('/:ticketId',);

topicRouter.post('/',);
topicRouter.post('/mail',);

topicRouter.patch('/',);



export default topicRouter;