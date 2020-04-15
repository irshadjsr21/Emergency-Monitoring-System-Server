const createError = require('http-errors');

module.exports = {
  admin: (req, res, next) => {
    if (
      res.locals.isLoggedIn &&
      res.locals.userId &&
      res.locals.userType === 'admin'
    ) {
      if (res.locals.isVerified) {
        next();
      } else {
        next(
          createError(403, { message: 'Please verify your email address.' }),
        );
      }
    } else {
      next(createError(401, { message: 'Unauthorized user' }));
    }
  },

  ambulance: (req, res, next) => {
    if (
      res.locals.isLoggedIn &&
      res.locals.userId &&
      res.locals.userType === 'ambulance'
    ) {
      next();
    } else {
      next(createError(401, { message: 'Unauthorized user' }));
    }
  },
};
