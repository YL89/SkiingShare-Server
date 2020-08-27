const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require('../config/auth.config');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next)=>{
    console.log("payload received", jwt_payload);

    if(jwt_payload){
        next(null, {
            username:jwt_payload.username,
            email: jwt_payload.email,
            postalCode: jwt_payload.postalCode
        })
    }else{
        next(null, false);
    }
})

passport.use(strategy);

module.exports = passport;