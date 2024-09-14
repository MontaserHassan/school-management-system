import express from 'express';

import getUser from '../../Middlewares/auth.middleware';
import authRouter from './auth.routes';
import authUserRouter from './authUser.routes';
import authTeacherRouter from './authTeacher.routes';
import authDirectorRouter from './authDirector.routes';
import authParentRouter from './authParent.routes';
import authAdminRouter from './authAdmin.routes';
import authSuperAdminRouter from './authSuperAdmin.routes';



const user = express.Router();

user.use('/auth', authRouter);
user.use(getUser());
user.use('/', authUserRouter);
user.use('/teacher', authTeacherRouter);
user.use('/director', authDirectorRouter);
user.use('/parent', authParentRouter);
user.use('/admin', authAdminRouter);
user.use('/superAdmin', authSuperAdminRouter);



export default user;