const { body } = require('express-validator');

module.exports = {
  create: [
    body('branchName')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Branch name should be present.'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
  ],
};
