'use strict';
const { v4: uuid } = require('uuid');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        allowNull: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => {
          return uuid();
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {},
  );
  Admin.associate = function (models) {
    // associations can be defined here
  };

  const encryptPassword = async (user) => {
    if (user.changed('password')) {
      const salt = await bcryptjs.genSalt(12);
      const hashPassword = await bcryptjs.hash(user.password, salt);
      user.password = hashPassword;
    }
    return user;
  };

  Admin.beforeCreate(encryptPassword);

  Admin.beforeUpdate(encryptPassword);

  Admin.prototype.checkPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };

  Admin.profileAttibutes = [
    'id',
    'name',
    'email',
    'isVerified',
    'createdAt',
    'updatedAt',
  ];

  return Admin;
};
