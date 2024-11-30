
import express from 'express';

import verifyPaymentRouter from './payment/verify-payment.routes';



const callbackPaymentRouter = express.Router();


callbackPaymentRouter.use('/', verifyPaymentRouter);



export default callbackPaymentRouter;