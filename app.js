const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { userRoute, authRoute } = require('./routes');


const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//MongoDB Configuration
mongoose
  .connect(process.env.MONGODB_URI || 'localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    // Test hook before test case if possible
    app.emit('app_started');
  })
  .catch(() => {});

mongoose.connection.on('connected', () => {
  // Test hook before test case if possible
  app.emit('app_started');
});

app.use('/api/categories', require('./routes/category.route'));
app.use('/webhook', require('./routes/webhook.route'));
app.use('/api/courses', require('./routes/course.route'));
app.use('/api/otp', require('./routes/otp.route'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
