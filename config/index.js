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
    SCHEMA: 'ems',
    HOST: '127.0.0.1',
    DIALECT: 'mysql',
  },
  JWT: {
    SECRET: 'secret',
    EXPIRES_IN: '30d',
  },
  SEND_GRID: {
    API_KEY: '1',
  },
  API_URL: 'http://localhost:3000',
  HASH: {
    SECRET: 'secret',
  },
};

if (process.env.NODE_ENV == 'production') {
  config.DB.USER = getEnvVariable('DB_USER');
  config.DB.PASSWORD = getEnvVariable('DB_PASSWORD');
  config.DB.SCHEMA = getEnvVariable('DB_SCHEMA');
  config.DB.HOST = getEnvVariable('DB_HOST');
  config.DB.DIALECT = getEnvVariable('DB_DIALECT');

  config.JWT.SECRET = getEnvVariable('JWT_SECRET');
  config.JWT.EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');

  config.SEND_GRID.API_KEY = getEnvVariable('SEND_GRID_API_KEY');

  config.API_URL = getEnvVariable('API_URL');

  config.HASH.SECRET = getEnvVariable('HASH_SECRET');
}

module.exports = config;
