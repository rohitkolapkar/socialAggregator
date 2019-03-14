var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport=require('passport');
var session=require('express-session');
var GoogleStategy=require('passport-google-oauth').OAuth2Strategy;
var auth=require('./routes/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

passport.use(new GoogleStategy({
  clientID:'475173781688-59sbiklu3nsmj1q8skaitovsld9jt84t.apps.googleusercontent.com',
  clientSecret:'ba0f4HhC7yDMEfes6_oBrX44',
  callbackURL:'http://localhost:3000/auth/google/callback'},
  function(req,accessToken,refreshToken,profile,done){
    done(null,profile);
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express-session
app.use(session({secret:'anything'}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
  done(null,user);

});

passport.deserializeUser(function(user,done){
  done(null,user);
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',auth);

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
