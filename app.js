var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const nocache = require('nocache')
const bodyParser = require('body-parser');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var admin_loginRouter = require('./routes/admin_login');
var admin_userRouter = require('./routes/admin_user');
var admin_dashboardRouter = require('./routes/admin_dashboard');

var app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// view engine setup

hbs.registerHelper('addOne', function(value) {
  return value + 1;
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session handling
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//cache remove
app.use(nocache())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/admin_login', admin_loginRouter);
app.use('/admin_user', admin_userRouter);
app.use('/admin_dashboard', admin_dashboardRouter);

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
