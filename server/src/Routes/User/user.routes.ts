import express from 'express';

import getUser from '../../Middlewares/auth.middleware';
import authRouter from './auth.routes';
import authUserRouter from './authUser.routes';
import authTeacherRouter from './authTeacher.routes';
import authDirectorRouter from './authDirector.routes';
import authParentRouter from './authParent.routes';
import authSuperAdminRouter from './authSuperAdmin.routes';
import authStudentRouter from './authStudent.routes';
import authClassRoomRouter from './authClassRoom.routes';
import authSubjectRouter from './authSubject.routes';


const user = express.Router();

user.use('/auth', authRouter);
user.use(getUser());
user.use('/', authUserRouter);
user.use('/teacher', authTeacherRouter);

user.use('/director', authDirectorRouter);
user.use('/class-room', authClassRoomRouter);
user.use('/subject', authSubjectRouter);

user.use('/student', authStudentRouter);
user.use('/parent', authParentRouter);
user.use('/superAdmin', authSuperAdminRouter);



export default user;