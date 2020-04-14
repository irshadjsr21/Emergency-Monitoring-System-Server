/**
 * This will return all the essential middleware to
 * initialize the server.
 */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const addUser = require('./addUser');

module.exports = [
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cors(),
  addUser,
];
