
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { paymentController } from '../../../Controllers/index.controller';
import { paymentValidator } from '../../../Validations/payment.validation';



const paymentRouter = express.Router();


paymentRouter.post('/', validation(paymentValidator.createPayment), paymentController.createPayment);

paymentRouter.get('/:paymentId', validation(paymentValidator.getPayment), paymentController.getPayment);



export default paymentRouter;