const createError = require('http-errors');

const createController = require('../createController');
const validator = require('../../validators/ambulance/auth');
const { Ambulances } = require('../../models');
const jwt = require('../../utils/jwt');

module.exports = {
  signup: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const doExist = await Ambulances.findOne({
        where: { email: inputBody.email },
      });
      if (doExist) {
        throw new createError(409, 'Duplicate account.', {
          errors: { email: 'This email is already in use.' },
        });
      }

      const noExist = await Ambulances.findOne({
        where: { vehicleNo: inputBody.vehicleNo },
      });
      if (dnoExist) {
        throw new createError(409, 'Duplicate account.', {
          errors: { vehicleNo: 'This Vehicle Number is already in use.' },
        });
      }


      await Ambulances.create(inputBody);

      res.status(201).send();
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validator.signup],
      },
      inputs: ['name', 'email', 'password','vehicleNo'],
    },
  ),

  login: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const ambulance = await Ambulances.findOne({
        where: { email: inputBody.email },
      });

      if (!ambulance) {
        throw new createError(404, 'User not found.', {
          errors: { email: 'Cannot find your account. Try signing up.' },
        });
      }

      const doMatch = await ambulance.checkPassword(inputBody.password);

      if (!doMatch) {
        throw new createError(401, 'Unauthorized.', {
          errors: { password: 'Incorrect password.' },
        });
      }

      const token = await jwt.sign(ambulance.id, 'ambulance');

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

  profile: createController(async (req, res) => {
    const { userId } = res.locals;

    const user = await Ambulances.findByPk(userId, {
      attributes: Ambulances.profileAttibutes,
    });

    res.json({ user });
  }),
};
