'use strict';
const { v4: uuid } = require('uuid');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Ambulance = sequelize.define(
    'Ambulance',
    {
      id: {
        allowNull: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => {
          return uuid();
        },
      },
      adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Admins',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    {},
  );
  Ambulance.associate = function (models) {
    Ambulance.belongsTo(models.Admin, {
      foreignKey: 'adminId',
      as: 'admin'
    });
  };

  const encryptPassword = async (user) => {
    if (user.changed('password')) {
      const salt = await bcryptjs.genSalt(12);
      const hashPassword = await bcryptjs.hash(user.password, salt);
      user.password = hashPassword;
    }
    return user;
  };

  Ambulance.beforeCreate(encryptPassword);

  Ambulance.beforeUpdate(encryptPassword);

  Ambulance.prototype.checkPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };

  Ambulance.profileAttibutes = [
    'id',
    'adminId',
    'vehicleNo',
    'email',
    'isVerified',
    'createdAt',
    'updatedAt',
  ];

  return Ambulance;
};
