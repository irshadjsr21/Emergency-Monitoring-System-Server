const createError = require('http-errors');

const createController = require('../createController');
const validator = require('../../validators/admin/ambulance');
const { Ambulance } = require('../../models');
const genPassword = require('../../utils/genPassword');

module.exports = {
  create: createController(
    async (req, res) => {
      const { inputBody } = res.locals;

      const doExist = await Ambulance.findOne({
        where: { email: inputBody.email },
      });
      if (doExist) {
        throw new createError(409, 'Duplicate account.', {
          errors: { email: 'This email is already in use.' },
        });
      }

      const password = genPassword(12);

      const ambulance = await Ambulance.create({
        ...inputBody,
        password,
        adminId: res.locals.userId,
      });

      const jsonData = ambulance.toJSON();

      res.status(201).send({
        ambulance: {
          id: jsonData.id,
          vehicleNo: jsonData.vehicleNo,
          email: jsonData.email,
          password: password,
          isVerified: jsonData.isVerified,
          createdAt: jsonData.createdAt,
          updatedAt: jsonData.updatedAt,
        },
      });
    },
    {
      validation: {
        asObject: true,
        throwError: true,
        validators: [validator.create],
      },
      inputs: ['vehicleNo', 'email'],
    },
  ),
};
