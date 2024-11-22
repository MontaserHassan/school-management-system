
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { ActivityController, } from '../../../Controllers/index.controller';
import { activityValidator } from '../../../Validations/activity.validation';
import checkRole from '../../../Middlewares/check-role.middleware';



const activityRouter = express.Router();


activityRouter.post('/', checkRole(['teacher',]), validation(activityValidator.createActivity), ActivityController.createActivity);

activityRouter.get('/', ActivityController.getAllActivities);
activityRouter.get('/:activityId', validation(activityValidator.getActivity), ActivityController.getActivityData);

activityRouter.patch('/', checkRole(['teacher',]), validation(activityValidator.updateActivity), ActivityController.updateActivityData);



export default activityRouter;