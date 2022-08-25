//make micro service for user
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
const cors = require('cors');
import helmet from 'helmet';
var morgan = require('morgan')
import mongoose from 'mongoose';
import {config} from './config';
const app = express();
const router = express.Router();
import userRouter from './pages/auth/login.controller';
import testRouter from './pages/test';
import * as dotenv from "dotenv";
import passport from 'passport';
import User from './models/user';
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
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true
    }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require ("./utils/passport")(passport);
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser(async (id, done) => {
   const USER = await User.findById(id);
   done(null, USER);
  });
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', userRouter);
app.use('/api/test',passport.authenticate("bearer", { 
    session: true,
 }), testRouter);


app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
}
);

