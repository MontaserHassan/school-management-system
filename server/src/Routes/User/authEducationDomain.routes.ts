
import express from 'express';

import checkRole from '../../Middlewares/check-role.middleware';
import educationDomainRouter from './education-domain/education-domain.routes';



const authEducationDomainRouter = express.Router();


authEducationDomainRouter.use(checkRole(['superAdmin', 'admin', 'director', 'teacher', 'parent']),);
authEducationDomainRouter.use('/', educationDomainRouter);



export default authEducationDomainRouter;