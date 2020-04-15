const { body } = require('express-validator');

module.exports = {
  create: [
    body('vehicleNo')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Vehicle no should be present.'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
  ],
};
