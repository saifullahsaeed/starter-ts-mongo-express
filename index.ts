//make micro service for user
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {config} from './config';
const app = express();
const router = express.Router();
const userRouter = require('./routes/user');


//connect to mongodb
mongoose.connect(config.database);
let db = mongoose.connection;
db.once('open', () => {
    console.log('connected to mongodb');
}).on('error', (err:any) => {
    console.log(err);
}
);
//user loggers
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', userRouter);
