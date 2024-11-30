
import express from 'express';

import validation from '../../../Validations/validationHandler.validation';
import { paymentController } from '../../../Controllers/index.controller';
import { paymentValidator } from '../../../Validations/payment.validation';



const verifyPaymentRouter = express.Router();


verifyPaymentRouter.get('/complete-payment', paymentController.completePayment);
verifyPaymentRouter.get('/cancel-payment', paymentController.cancelPayment);



export default verifyPaymentRouter;