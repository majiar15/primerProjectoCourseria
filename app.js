var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
let tokenRouter = require('./routes/token');
var bicicletasRouter = require('./routes/bicicletas');
var apiBicicletasRouter = require('./routes/api/bicicletas');
var apiUsuariosRouter = require('./routes/api/usuario');
var app = express();
let mongoose = require('mongoose');
let mongoDB = 'mongodb://localhost/red_bicicletas';
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/token',tokenRouter)
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', apiBicicletasRouter);
app.use('/api/usuarios', apiUsuariosRouter);
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