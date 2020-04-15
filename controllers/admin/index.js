const createError = require('http-errors');

const createController = require('../createController');
const validator = require('../../validators/admin/auth');
const { Admin } = require('../../models');
const jwt = require('../../utils/jwt');

module.exports = {
  signup: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const doExist = await Admin.findOne({
        where: { email: inputBody.email },
      });
      if (doExist) {
        throw new createError(409, 'Duplicate account.', {
          errors: { email: 'This email is already in use.' },
        });
      }

      await Admin.create(inputBody);

      res.status(201).send();
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validator.signup],
      },
      inputs: ['name', 'email', 'password'],
    },
  ),

  login: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const admin = await Admin.findOne({
        where: { email: inputBody.email },
      });

      if (!admin) {
        throw new createError(404, 'User not found.', {
          errors: { email: 'Cannot find your account. Try signing up.' },
        });
      }

      const doMatch = await admin.checkPassword(inputBody.password);

      if (!doMatch) {
        throw new createError(401, 'Unauthorized.', {
          errors: { password: 'Incorrect password.' },
        });
      }

      const token = await jwt.sign(admin.id, 'admin');

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

    const user = await Admin.findByPk(userId, {
      attributes: Admin.profileAttibutes,
    });

    res.json({ user });
  }),
};
