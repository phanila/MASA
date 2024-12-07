import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import router from './routes';
import { User } from './entity/User';
import cors from 'cors';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [User],
});

AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use('/api', router);

        app.listen(3000, () => {
            console.log('Server started on http://localhost:3000');
        });
    })
    .catch(error => console.log(error));
