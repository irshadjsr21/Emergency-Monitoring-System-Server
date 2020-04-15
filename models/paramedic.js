'use strict';
const { v4: uuid } = require('uuid');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Paramedic = sequelize.define(
      'Paramedic',
      {
        id: {
          allowNull: true,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: () => {
            return uuid();
          },
        },
        vno: {
          type: DataTypes.INTEGER,
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
    Paramedic.associate = function (models) {
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
  
    Paramedic.beforeCreate(encryptPassword);
  
    Paramedic.beforeUpdate(encryptPassword);
  
    Paramedic.prototype.checkPassword = async function (password) {
      return await bcryptjs.compare(password, this.password);
    };
  
    Paramedic.profileAttibutes = [
      'id',
      'vno',
      'email',
      'isVerified',
      'createdAt',
      'updatedAt',
    ];
  
    return Paramedic;
  };
  