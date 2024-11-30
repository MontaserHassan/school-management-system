
import express from 'express';

import paymentRouter from './payment/payment.routes';



const authPaymentRouter = express.Router();


authPaymentRouter.use('/', paymentRouter);



export default authPaymentRouter;