import express from 'express';

import getUser from '../../Middlewares/auth.middleware';
import isSchoolSubscription from '../../Middlewares/school.middleware';
import authRouter from './auth.routes';
import authUserRouter from './authUser.routes';
import authTeacherRouter from './authTopic.routes';
import authDirectorRouter from './authDirector.routes';
import authParentRouter from './authParent.routes';
import authSuperAdminRouter from './authSchool.routes';
import authStudentRouter from './authStudent.routes';
import authClassRoomRouter from './authClassRoom.routes';
import authSubjectRouter from './authSubject.routes';
import authSchoolRouter from './authSchool.routes';


const user = express.Router();

user.use('/auth', authRouter);
user.use(getUser());
// user.use(isSchoolSubscription());
user.use('/', authUserRouter);
user.use('/teacher', authTeacherRouter);

user.use('/director', authDirectorRouter);
user.use('/class-room', authClassRoomRouter);
user.use('/subject', authSubjectRouter);

user.use('/student', authStudentRouter);
user.use('/parent', authParentRouter);
user.use('/school', authSchoolRouter);



export default user;