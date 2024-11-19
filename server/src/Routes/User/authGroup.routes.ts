
import express from 'express';

import groupRouter from './group/group.routes';



const authGroupRouter = express.Router();


authGroupRouter.use('/', groupRouter);



export default authGroupRouter;