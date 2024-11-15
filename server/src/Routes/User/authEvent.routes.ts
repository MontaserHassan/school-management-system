
import express from 'express';

import eventRouter from './event/event.routes';



const authEventRouter = express.Router();


authEventRouter.use('/', eventRouter);



export default authEventRouter;