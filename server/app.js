import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

// create app object
const app = express();

// Middlewares to properly parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// Mount the router on the app object
app.use(router);

// log requests to the console
app.use(morgan('dev'));

export default app;
