const BearerStrategy = require('passport-http-bearer').Strategy;
import User from '../models/user';
import Jwt from './jwt';


module.exports = (passport: any) => {
  
  passport.use(new BearerStrategy(
     (token: any, done: any) => {
        Jwt.verify(token,`${process.env.SESSION_SECRET}`, (err: any, decoded: any) => {
            if (err) {
                return done(err);
            }
            if (decoded.exp < Date.now()) {
                return done(null, false);
            }
            User.findById(decoded.id, (err: any, user: any) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } );
        } );
    }
  ));

}