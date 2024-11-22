import express, { Express, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as path from 'path';

dotenv.config();

import { DBConnection } from './Connections/index.connection';
import router from './Routes/index.routes';
// import { logger } from './Config/index.config';
import { sendNotification } from './Scripts/check-subscription-expiration.script';
import { updateExpiredSubscriptions } from './Scripts/update-expiry-subscription.script';



const app: Express = express();
const server: Server = http.createServer(app);


app.use(cors());
app.use('/Public', express.static(path.join(__dirname, '../src/Public')));
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.on('finish', () => {
//         logger.logRequestAndResponse(req, res,);
//     });
//     next();
// });

app.use((req: Request, res: Response, next: NextFunction) => {
    const timeout = Number(process.env.TIME_OUT);
    res.setTimeout(timeout, () => {
        res.status(503).json({ message: 'Request timed out' });
    });
    next();
});

sendNotification();
updateExpiredSubscriptions();
DBConnection(server);
app.use('/api', router);