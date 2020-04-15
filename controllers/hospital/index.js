const createError = require('http-errors');

const createController = require('../createController');
const validator = require('../../validators/hospital/auth');
const { Hospital, Hash, Sequelize } = require('../../models');
const jwt = require('../../utils/jwt');

module.exports = {
  login: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const hospital = await Hospital.findOne(
        {
          where: { email: inputBody.email },
        },
        { attributes: ['id', 'isVerified', 'password'] },
      );

      if (!hospital) {
        throw new createError(404, 'User not found.', {
          errors: { email: 'Cannot find your account. Try signing up.' },
        });
      }

      const doMatch = await hospital.checkPassword(inputBody.password);

      if (!doMatch) {
        throw new createError(401, 'Unauthorized.', {
          errors: { password: 'Incorrect password.' },
        });
      }

      const token = await jwt.sign(hospital.id, 'hospital');

      res.status(200).send({ token });
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validator.login],
      },
      inputs: ['email', 'password'],
    },
  ),

  verify: createController(async (req, res) => {
    const { hash } = req.query;
    const hashObj = await Hash.findOne({
      where: {
        hash,
        userType: 'hospital',
        validTill: { [Sequelize.Op.gte]: new Date() },
      },
    });

    if (!hashObj) {
      throw new createError(404, 'Not found.', {
        errors: { default: 'This link is invalid or expired.' },
      });
    }

    await Hospital.update({ isVerified: true }, { where: { id: hashObj.userId } });

    res.status(200).send('Your email has beed verified.');

    await hashObj.destroy();
  }),

  profile: createController(async (req, res) => {
    const { userId } = res.locals;

    const user = await Hospital.findByPk(userId, {
      attributes: Hospital.profileAttibutes,
    });

    res.json({ user });
  }),
};
