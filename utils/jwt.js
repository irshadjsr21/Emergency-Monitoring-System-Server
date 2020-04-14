const jwt = require('jsonwebtoken');

const { JWT } = require('../config');

module.exports.sign = async (userId, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        id: userId,
        type,
      };

      jwt.sign(
        payload,
        JWT.SECRET,
        {
          expiresIn: JWT.EXPIRES_IN,
        },
        (err, token) => {
          if (err) {
            reject(err);
          }

          resolve(token);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.verify = (token) => {
  try {
    const tokenData = jwt.verify(token, JWT.SECRET);
    return tokenData;
  } catch (error) {
    console.log(error);
    return {};
  }
};
