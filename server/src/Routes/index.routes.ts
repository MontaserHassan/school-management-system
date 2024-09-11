
import express, { Request, Response } from 'express';

import errorHandler from '../Middlewares/error.middleware'
import user from './User/user.routes';
import lookups from './lookups/lookups.routes';



const router = express.Router();


router.get('/', (req: Request, res: Response) => { res.status(200).send({ message: 'Welcome to school management system' }); });
router.use('/lookups', lookups);
router.use('/user', user);
router.use('*', (req: Request, res: Response) => res.status(404).send({ message: `This url not found ${req.originalUrl}` }));
router.use(errorHandler);



export default router;