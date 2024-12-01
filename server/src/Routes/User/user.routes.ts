import express from 'express';

import getUser from '../../Middlewares/auth.middleware';
import isSchoolSubscription from '../../Middlewares/school.middleware';
import isSchoolVerified from '../../Middlewares/verify-school.middleware';

import authRouter from './auth.routes';
import authUserRouter from './authUser.routes';
import authDomainRouter from './authDomain.routes';
import authSkillRouter from './authSkill.routes';
import authActivityRouter from './authActivity.routes';
import authParentRouter from './authParent.routes';
import authStudentRouter from './authStudent.routes';
import authClassRoomRouter from './authClassRoom.routes';
import authSchoolRouter from './authSchool.routes';
import authInvoiceRouter from './authInvoice.routes';
import authTicketRouter from './authTicket.routes'
import authNotificationRouter from './authNotification.routes';
import authGroupRouter from './authGroup.routes';
import authEventRouter from './authEvent.routes';
import authPaymentRouter from './authPayment.routes';
import verifyPaymentRouter from './payment/verify-payment.routes';
import authVerifySchoolRouter from './authVerifySchool.routes';



const user = express.Router();

user.use('/auth', authRouter);
user.use('/verify-payment', verifyPaymentRouter);
user.use(getUser());
user.use('/payment', authPaymentRouter);
user.use('/invoice', authInvoiceRouter);
user.use(isSchoolSubscription());
user.use('/verify-school', authVerifySchoolRouter);
user.use('/', authUserRouter);
user.use('/domain', authDomainRouter);
user.use(isSchoolVerified());
user.use('/class-room', authClassRoomRouter);
user.use('/skill', authSkillRouter);
user.use('/activity', authActivityRouter);
user.use('/ticket', authTicketRouter);
user.use('/notification', authNotificationRouter);
user.use('/group', authGroupRouter);
user.use('/event', authEventRouter);
user.use('/student', authStudentRouter);
user.use('/parent', authParentRouter);
user.use('/school', authSchoolRouter);



export default user;