var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cartRouter = require('./routes/cart');
var customRouter = require('./routes/custom');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var communityRouter = require('./routes/community')
var drinkdetailRouter = require('./routes/drinkdetail')
var mypageRouter = require('./routes/mypage')
var complainRouter = require('./routes/complainHistory')
var reviewWriteRouter = require('./routes/reviewWrite')
var reviewHistoryRouter = require('./routes/reviewHistory')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/cart', cartRouter);
app.use('/custom', customRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/menu', menuRouter);
app.use('/community', communityRouter);
app.use('/drinkdetail', drinkdetailRouter);
app.use('/mypage',mypageRouter);
app.use('/complainhistory', complainRouter);
app.use('/reviewWrite', reviewWriteRouter);
app.use('/reviewHistory', reviewHistoryRouter);

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
