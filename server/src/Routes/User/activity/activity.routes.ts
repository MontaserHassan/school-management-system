
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { ActivityController, } from '../../../Controllers/index.controller';
import { activityValidator } from '../../../Validations/activity.validation';



const activityRouter = express.Router();


activityRouter.post('/', validation(activityValidator.createActivity), ActivityController.createActivity);

activityRouter.get('/', ActivityController.getAllActivities);
activityRouter.get('/:activityId', validation(activityValidator.getActivity), ActivityController.getActivityData);

activityRouter.patch('/', validation(activityValidator.updateActivity), ActivityController.updateActivityData);



export default activityRouter;