'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ambulances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicleNo: {
        type: Sequelize.INTEGER,
	allowNull: false
      },
      email: {
        type: Sequelize.STRING,
	allowNull: false
      },
      password: {
        type: Sequelize.STRING,
	allowNull: false
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
	defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ambulances');
  }
};