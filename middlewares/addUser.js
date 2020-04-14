const jwt = require('../utils/jwt');
const { Admin } = require('../models');

module.exports = async (req, res, next) => {
  try {
    res.locals.isLoggedIn = false;
    res.locals.userType = null;
    res.locals.userId = null;

    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1];
      const paylaod = jwt.verify(token);
      if (paylaod) {
        const { id, type } = paylaod;
        if (id && type) {
          let user;
          switch (type) {
            case 'admin':
              user = await Admin.count({ where: { id } });
          }

          if (user) {
            res.locals.userType = type;
            res.locals.userId = id;
            res.locals.isLoggedIn = true;
          }
        }
      }
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
