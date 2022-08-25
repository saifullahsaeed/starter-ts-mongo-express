//make micro service for user
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import helmet from 'helmet';
var morgan = require('morgan')
import mongoose from 'mongoose';
import {config} from './config';
const app = express();
const router = express.Router();
import userRouter from './pages/auth/login.controller';
import * as dotenv from "dotenv";
dotenv.config(
    {
        path: "./.env"
    }
);



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
app.use('/api/auth', userRouter);


app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
}
);

