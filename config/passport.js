const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const passport = require('passport');

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

Passport.serializeUser(function(user,cb) {
    cb(null, user.id);
});

Passport.deserializeUser(function(id,cb) {
    Usuario.findById(id,function(err,usuario) {
        cb(err,usuario);
    });
});


module.exports = passport;