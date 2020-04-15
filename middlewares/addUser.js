const jwt = require('../utils/jwt');
const { Admin, Ambulance, Hospital } = require('../models');

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
              user = await Admin.findByPk(id, {
                attributes: ['id', 'isVerified'],
              });
              break;
            case 'ambulance':
              user = await Ambulance.findByPk(id, {
                attributes: ['id', 'isVerified'],
              });
              break;
            case 'hospital':
              user = await Hospital.findByPk(id, {
                attributes: ['id', 'isVerified'],
              });
              break;
          }

          if (user) {
            res.locals.userType = type;
            res.locals.userId = id;
            res.locals.isLoggedIn = true;
            res.locals.isVerified = user.isVerified;
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
