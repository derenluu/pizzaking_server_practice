require('dotenv').config();

const env = {
  AUTHOR: process.env.AUTHOR,

  LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
  LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT,

  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
};

module.exports = env;
