
import mongoose from 'mongoose';
import { Server } from 'http';

import AppDataSource from '../Config/orm.config';
import { startingApp } from '../Config/index.config';


// const DB_URL = String(process.env.DB_HOST_SQL); // mysql
const DB_URL = String(process.env.DB_URL);//mongo


const DBConnection = async (server: Server) => {

    // await AppDataSource.initialize()
    mongoose.connect(DB_URL, {
    }).then(() => {
        console.log(`Database Connected on ${DB_URL}`);
        startingApp(server);
    }).catch((err: Error) => {
        console.log("Database Error: ", err)
    });
};



export default DBConnection;