require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let passport = require('./config/passport'); 
const session = require('express-session');
const jwt = require('jsonwebtoken');
const MongoDbStore = require('connect-mongodb-session')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
let tokenRouter = require('./routes/token');
let bicicletasRouter = require('./routes/bicicletas');
let apiBicicletasRouter = require('./routes/api/bicicletas');
let apiUsuariosRouter = require('./routes/api/usuario');
let apiAuthRouter =  require('./routes/api/auth');

let Store;
if(process.env.NODE_ENV ==="development"){
    Store = new session.MemoryStore;
}else{
    Store = new MongoDbStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions'
    });
    Store.on('error',function(error) {
        assert.ifError(error);
        assert.ok(false);
    })
}

var app = express();

app.set('secretKey',"jwt_secret1243sa");

app.use(session({
     cookie: {maxAge: 240*60*60*1000},
     store: Store,
     saveUninitialized:true,
     resave: true,
     secret:'red:de;bicisaa:dsdw'
}));
let mongoose = require('mongoose');
const usuario = require('./models/usuario');
const token = require('./models/token');
const { assert } = require('console');

let mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console,"MongoDb connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/login',function(req,res) {
    res.render('session/login');
});

app.post('/login',function(req,res,next) {
    passport.authenticate('local',function(err,user,info) {
       if(err) return next(err);
       if(!user) return res.render('session/login',{info});
       req.login(user, function(err) {
           if(err) return next(err);
           return res.redirect('/');
       });
    })(req,res,next);
});

app.get('/logout',function(req,res) {
    req.logOut();
    res.redirect('/');
});
app.get('/forgotPassword', function(req,res) {
    res.render('session/forgotPassword');
});
app.post('/forgotPassword', function(req,res) {
    usuario.findOne({email:req.body.email},function(err,user) {
        if(!user) return res.render('session/forgotPassword',{info:{message:"no existe el email para un usuario existente"}});
        user.resetPassword(function(err) {
            if(err) return next(err);
            console.log('session/forgotPassword');
        });
        res.render('session/forgotPassword');
    });
});

app.get('/resetPassword/:token',function(req,res,next) {
    token.findOne({token: req.params.token},function(err,token) {
        
        if(err) return res.status(400).send({type:'not-verified', msg: "No existe un usuario asociado al Token. Verifique que su token no haya expirado."});
        usuario.findById(token._userId,function(err, user) {
            if(!user) return res.status(400).send({msg:"No existe un usuario asociado al token"});
            res.render('session/resetPassword', {errors:{},usuario:user});

        });
    });
});

app.post('/resetPassword',function(req,res) {
    if(req.body.password != req.body.confirm_password){
        res.render('session/resetPassword',{error:{confirm_password:{message: "No coincide el password ingresado"}},
    usuario: new usuario({email: req.body.email})});
    return;
    }
    usuario.findOne({email: req.body.email}, function(err, user) {
        user.password = req.body.password;
        user.save(function(err) {
            if(err){
                res.render('session/resetPassword', {errors: err.error, usuario: new usuario({email:req.body.email})});
            }else{
                res.redirect('/login');
            }});
    });
});
function loggedin(req,res,next) {
    if (req.user) {
        next();
    }else{
        console.log('usuario sin loguar');
        res.redirect('login');
    }
}
function validarUsuario(req,res,next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'),function(err,decoded) {
        if (err) {
            res.json({status:"error",message: err.message,data:null});
        }else{
            req.body.userId = decoded.id;
            console.log('jwt verify : '+decoded);
            next();
        }
    })
}



app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/token',tokenRouter)
app.use('/bicicletas',loggedin, bicicletasRouter);
app.use('/api/bicicletas', validarUsuario , apiBicicletasRouter);
app.use('/api/usuarios', apiUsuariosRouter);
app.use('/api/auth', apiAuthRouter);


app.use('/privaciti_policy',function(req,res) {
    res.sendfile('public/privaciti_policy.html');
});
app.use('/googlec4e77944661ba764',function(req,res) {
    res.sendfile('public/googlec4e77944661ba764.html');
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }
));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;