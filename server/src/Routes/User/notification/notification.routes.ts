
import express from 'express';

import { notificationController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { notificationValidator } from '../../../Validations/notification.validation';



const notificationRouter = express.Router();


notificationRouter.get('/', notificationController.getNotifications);
notificationRouter.get('/:notificationId', validation(notificationValidator.getNotification), notificationController.getNotification);



export default notificationRouter;