const { body } = require('express-validator');

module.exports = {
  signup: [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Name should be present.'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.'),
  ],

  login: [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.'),
  ],
};
