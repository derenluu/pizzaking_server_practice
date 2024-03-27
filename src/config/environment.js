require('dotenv').config();

const env = {
  BUILD_MODE: process.env.BUILD_MODE,

  AUTHOR: process.env.AUTHOR,

  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,

  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
};

module.exports = env;
