'use strict';
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Hash = sequelize.define(
    'Hash',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => {
          return uuid();
        },
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      validTill: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {},
  );
  Hash.associate = function (models) {
    // associations can be defined here
  };
  return Hash;
};
