
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { topicController } from '../../../Controllers/index.controller';
import { topicValidator } from '../../../Validations/topic.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const topicRouter = express.Router();


topicRouter.get('/', topicController.getAllTopics);
topicRouter.get('/:topicId', validation(topicValidator.getTopic), topicController.getTopicData);

topicRouter.post('/', (checkRole(['teacher'])), validation(topicValidator.createTopic), topicController.createTopic);
topicRouter.patch('/', (checkRole(['teacher'])), validation(topicValidator.updateTopic), topicController.updateTopicData);



export default topicRouter;