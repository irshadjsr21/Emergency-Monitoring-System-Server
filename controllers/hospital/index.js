const createError = require('http-errors');

const createController = require('../createController');
const validator = require('../../validators/hospital/auth');
const { Hospital } = require('../../models');
const jwt = require('../../utils/jwt');

module.exports = {
  signup: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const doExist = await Hospital.findOne({
        where: { email: inputBody.email },
      });
      if (doExist) {
        throw new createError(409, 'Duplicate account.', {
          errors: { email: 'This email is already in use.' },
        });
      }
      
      const branchExist = await Hospital.findOne({
        where: { branchName: inputBody.branchName },
      });
      if (branchExist) {
        throw new createError(409, 'Duplicate account.', {
          errors: { branchName: 'There is an existing account for this corresponding branch name.' },
        });
      }

      await Hospital.create(inputBody);

      res.status(201).send();
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validator.signup],
      },
      inputs: ['name', 'email', 'password','location','branchName'],
    },
  ),

  login: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const hospital = await Hospital.findOne({
        where: { email: inputBody.email },
      });

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

  profile: createController(async (req, res) => {
    const { userId } = res.locals;

    const user = await Hospital.findByPk(userId, {
      attributes: Hospital.profileAttibutes,
    });

    res.json({ user });
  }),
};
