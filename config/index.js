/**
 * This file will contain all the configuration keys.
 * Throws error if in production and a key is not specified.
 */

const getEnvVariable = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`ENVIREMENT VARIABLE '${key}' NOT SPECIFIED.`);
};

let config = {
  DB: {
    USER: 'irshad',
    PASSWORD: 'Sql@password123',
    SCHEMA: 'e_commerce',
    HOST: '127.0.0.1',
    DIALECT: 'mysql',
  },
};

if (process.env.NODE_ENV == 'production') {
  config.DB.USER = getEnvVariable('DB_USER');
  config.DB.PASSWORD = getEnvVariable('DB_PASSWORD');
  config.DB.SCHEMA = getEnvVariable('DB_SCHEMA');
  config.DB.HOST = getEnvVariable('DB_HOST');
  config.DB.DIALECT = getEnvVariable('DB_DIALECT');
}

module.exports = config;
