const {Strategy, ExtractJwt} = require('passport-jwt');
const DAL = require('../DAL');
const USER_COL = "users";
const secret = process.env.secret;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
             DAL.Get(USER_COL, {email: payload.email}, (user) => {
                     if(user){
                       return done(null, payload);
                     }
                     return done(null, false);
                  });
              })
           );
     };