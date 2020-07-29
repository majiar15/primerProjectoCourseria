const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook-token');

Passport.use(new LocalStrategy(
    function (email, password, done) {
        Usuario.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, { message: "Email no existente" });
            if (!user.validPassword(password)) return done(null, false, { message: "password incorrecto" });

            return done(null, user);
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
},
    function (accessToken, refreshToken, profile, done) {
        try {
            Usuario.findOrCreateByFacebook(profile, function (err, user) {
                if (err) console.log(err);
                return done(err, user);
            });
        } catch (err2) {
            console.log(err2);
            return done(err2, null);
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        Usuario.findOrCreateByGoogle(profile, function (err, user) {
            return cb(err, user);
        });
    }
));

Passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

Passport.deserializeUser(function (id, cb) {
    Usuario.findById(id, function (err, usuario) {
        cb(err, usuario);
    });
});


module.exports = passport;