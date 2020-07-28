const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

Passport.use(new LocalStrategy(
    function(email, password, done) {
        Usuario.findOne({email:email},function (err,user) {
           if(err) return done(err);
            if(!user) return done(null,false,{message:"Email no existente"});
            if(!user.validPassword(password)) return done(null,false,{message:"password incorrecto"});

            return done(null,user);
        });
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
       Usuario.findOrCreate(profile, function (err, user) {
         return cb(err, user);
       });
  }
));

Passport.serializeUser(function(user,cb) {
    cb(null, user.id);
});

Passport.deserializeUser(function(id,cb) {
    Usuario.findById(id,function(err,usuario) {
        cb(err,usuario);
    });
});


module.exports = passport;