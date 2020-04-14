const createError = require('http-errors');
const express = require('express');

const { sequelize } = require('./models');
const indexRouter = require('./routes/index');
const initMiddleware = require('./middlewares/init');

const app = express();

app.use(initMiddleware);

app.use('/', indexRouter);

// Catch 404 error
app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: `The path '${req.method} ${req.path}' does not exist.` });
});

// Error handler
app.use(function (error, req, res, next) {
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
