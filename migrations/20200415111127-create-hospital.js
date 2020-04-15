'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      branchName: {
        type: Sequelize.STRING,
	allowNull: false
      },
      location: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Hospitals');
  }
};