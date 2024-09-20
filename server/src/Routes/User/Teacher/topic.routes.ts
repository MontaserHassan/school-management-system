
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { topicController } from '../../../Controllers/index.controller';
import { topicValidator } from '../../../Validations/topic.validation';



const topicRouter = express.Router();


topicRouter.post('/', validation(topicValidator.createTopic), topicController.createTopic);
topicRouter.get('/', topicController.getAllTopics);
topicRouter.get('/:topicId', validation(topicValidator.getTopic), topicController.getTopicData);
topicRouter.delete('/:topicId', validation(topicValidator.deleteTopic), topicController.deleteTopic)



export default topicRouter;