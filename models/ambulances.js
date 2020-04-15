'use strict';
const { v4: uuid } = require('uuid');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Ambulances = sequelize.define(
      'Ambulances',
      {
        id: {
          allowNull: true,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: () => {
            return uuid();
          },
        },
        vehicleNo: {
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
    Ambulances.associate = function (models) {
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
  
    Ambulances.beforeCreate(encryptPassword);
  
    Ambulances.beforeUpdate(encryptPassword);
  
    Ambulances.prototype.checkPassword = async function (password) {
      return await bcryptjs.compare(password, this.password);
    };
  
    Ambulances.profileAttibutes = [
      'id',
      'vehicleNo',
      'email',
      'isVerified',
      'createdAt',
      'updatedAt',
    ];
  
    return Ambulances;
  };
  