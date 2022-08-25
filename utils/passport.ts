const BearerStrategy = require('passport-http-bearer').Strategy;
import User from '../models/user';
import Jwt from './jwt';


module.exports = (passport: any) => {
  
  passport.use(new BearerStrategy(
     (token: any, done: any) => {

        Jwt.verify(token,`${process.env.SESSION_SECRET}`, (err: any, decoded: any) => {
            if (err) {
                return done(err, false);
            }
            Date.now() < decoded.iat ? done(
                err
            , false) : User.findById(decoded.id, (err: any, user: any) => {
                if (err) {
                    return done(err, false);
                }
                if (!user) {
                    return done(err, false);
                }
                return done(null, user);
            } ); 
            
           
        } );
    }
  ));

}