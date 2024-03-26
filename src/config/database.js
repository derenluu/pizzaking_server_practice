require('dotenv').config();

const {MongoClient, ServerApiVersion} = require('mongodb');

// Initially null to check database connection
let dbInstance = null;

// Replace the uri string with your connection string.
const MONGODB_URL = 'mongodb+srv://derenluu:wH5JbSdeGC57wJXl@shoeshopproject.mijuukv.mongodb.net/?retryWrites=true&w=majority&appName=ShoeShopProject';
const DATABASE_NAME = 'sample_mflix';

const mongoClientInstance = new MongoClient(MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the database
const connectDB = async () => {
  await mongoClientInstance.connect();

  // On successful connection, assign the database instance to dbInstance
  dbInstance = mongoClientInstance.db(DATABASE_NAME);
};

// Function to get the database instance
const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to MongoDB first.');
  return dbInstance;
};

// Export both functions
module.exports = {connectDB, getDB};

// derenluu
// wH5JbSdeGC57wJXl
// mongodb+srv://derenluu:<password>@shoeshopproject.mijuukv.mongodb.net/?retryWrites=true&w=majority&appName=ShoeShopProject
// mongodb+srv://derenluu:<password>@shoeshopproject.mijuukv.mongodb.net/
