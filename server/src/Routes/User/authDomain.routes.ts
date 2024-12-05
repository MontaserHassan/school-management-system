
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import domainRouter from './domain/domain.routes';



const authDomainRouter = express.Router();


authDomainRouter.use(checkRole(['director', 'admin', 'director', 'teacher', 'parent']),);
authDomainRouter.use('/', domainRouter);



export default authDomainRouter;