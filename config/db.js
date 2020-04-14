/**
 * Configuration file for Sequelize
 */

const { DB } = require('./index');

const sqlConfig = {
  username: DB.USER,
  password: DB.PASSWORD,
  database: DB.SCHEMA,
  host: DB.HOST,
  dialect: DB.DIALECT,
};

module.exports = {
  development: sqlConfig,
  test: sqlConfig,
  production: sqlConfig,
};
