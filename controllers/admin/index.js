const createError = require('http-errors');

const createController = require('../createController');
const validator = require('../../validators/admin/auth');
const { Admin, Hash, Sequelize } = require('../../models');
const { sendAdminVerifyMail } = require('../../utils/mailer');
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

      const admin = await Admin.create(inputBody);

      res.status(201).send();

      sendAdminVerifyMail({ email: admin.email, userId: admin.id });
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

      const admin = await Admin.findOne(
        {
          where: { email: inputBody.email },
        },
        { attributes: ['id', 'isVerified'] },
      );

      if (!admin) {
        throw new createError(404, 'User not found.', {
          errors: { email: 'Cannot find your account. Try signing up.' },
        });
      }

      if (!admin.isVerified) {
        throw new createError(403, 'Not verified.', {
          errors: {
            email:
              'Please verify your email address by the link emailed to your account.',
          },
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

  verify: createController(async (req, res) => {
    const { hash } = req.query;
    const hashObj = await Hash.findOne({
      where: {
        hash,
        userType: 'admin',
        validTill: { [Sequelize.Op.gte]: new Date() },
      },
    });

    if (!hashObj) {
      throw new createError(404, 'Not found.', {
        errors: { default: 'This link is invalid or expired.' },
      });
    }

    await Admin.update({ isVerified: true }, { where: { id: hashObj.userId } });

    res.status(200).send('Your email has beed verified.');

    await hashObj.destroy();
  }),

  profile: createController(async (req, res) => {
    const { userId } = res.locals;

    const user = await Admin.findByPk(userId, {
      attributes: Admin.profileAttibutes,
    });

    res.json({ user });
  }),
};
