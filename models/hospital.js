'use strict';
const { v4: uuid } = require('uuid');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define(
      'Hospital',
      {
        id: {
          allowNull: true,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: () => {
            return uuid();
          },
        },
        branchName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        location: {
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
      {}
    );
    Hospital.associate = function (models) {
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
  
    Hospital.beforeCreate(encryptPassword);
  
    Hospital.beforeUpdate(encryptPassword);
  
    Hospital.prototype.checkPassword = async function (password) {
      return await bcryptjs.compare(password, this.password);
    };
  
    Hospital.profileAttibutes = [
      'id',
      'branchname',
      'location',
      'email',
      'isVerified',
      'createdAt',
      'updatedAt',
    ];
  
    return Hospital;
  };
  