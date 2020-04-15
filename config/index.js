/**
 * This file will contain all the configuration keys.
 * Throws error if in production and a key is not specified.
 */

const getEnvVariable = (key) => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production')
    throw new Error(`ENVIREMENT VARIABLE '${key}' NOT SPECIFIED.`);
  return value;
};

const config = {
  DB: {
    USER: getEnvVariable('DB_USER'),
    PASSWORD: getEnvVariable('DB_PASSWORD'),
    SCHEMA: getEnvVariable('DB_SCHEMA'),
    HOST: getEnvVariable('DB_HOST'),
    DIALECT: getEnvVariable('DB_DIALECT'),
  },
  JWT: {
    SECRET: getEnvVariable('JWT_SECRET'),
    EXPIRES_IN: getEnvVariable('JWT_EXPIRES_IN'),
  },
  SEND_GRID: {
    API_KEY: getEnvVariable('SEND_GRID_API_KEY'),
  },
  API_URL: getEnvVariable('API_URL'),
  HASH: {
    SECRET: getEnvVariable('HASH_SECRET'),
  },
};

module.exports = config;
