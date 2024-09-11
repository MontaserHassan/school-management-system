import { DataSource } from 'typeorm';

import { User } from '../Models/user.model';



export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST_SQL,
    port: Number(process.env.DB_PORT_SQL),
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    synchronize: true,
    // logging: true,
    entities: [User],
});
