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
      branchName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
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
  Hospital.associate = function (models) {
    Hospital.belongsTo(models.Admin, {
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

  Hospital.beforeCreate(encryptPassword);

  Hospital.beforeUpdate(encryptPassword);

  Hospital.prototype.checkPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };

  Hospital.profileAttibutes = [
    'id',
    'adminId',
    'branchName',
    'location',
    'email',
    'isVerified',
    'createdAt',
    'updatedAt',
  ];

  return Hospital;
};
