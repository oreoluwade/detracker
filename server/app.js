import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter, transactionRouter } from './routes';


// create app object
const app = express();

// Middlewares to properly parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// Mount the routers on the app object
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);


// log requests to the console
app.use(morgan('dev'));

export default app;
