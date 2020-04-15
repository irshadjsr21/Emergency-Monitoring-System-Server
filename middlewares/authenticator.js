const createError = require('http-errors');

module.exports = {
  admin: (req, res, next) => {
    if (
      res.locals.isLoggedIn &&
      res.locals.userId &&
      res.locals.userType === 'admin'
    ) {
      next();
    } else {
      next(createError(401, { message: 'Unauthorized user' }));
    }
  },
};
