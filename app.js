const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { sequelize } = require('./models');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ message: 'Page not found' });
});

// error handler
app.use(function (err, req, res, next) {
  if (error instanceof createError.HttpError) {
    const obj = {
      message: error.message,
    };
    if (error.errors) {
      obj.errors = error.errors;
    }
    res.status(error.status).json(obj);
  } else {
    console.log(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to Database.');
  })
  .catch((error) => {
    console.log('Failed to connect to database');
    console.log(error);
    process.exit(0);
  });

module.exports = app;
