require('dotenv').config();

const {MongoClient, ServerApiVersion} = require('mongodb');
const env = require('./environment');

// Initially null to check database connection
let dbInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the database
const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  // On successful connection, assign the database instance to dbInstance
  dbInstance = mongoClientInstance.db(env.DB_NAME);
};

// Function to get the database instance
// Lưu ý: phải đảm bảo chỉ luôn gọi GET_DB sau khi đã connect thành công tới MongoDB (là biến dbInstance)
// Vì biến dbInstance đã đc tạo từ trước để nhận kết quả kết nối với MongoDB (là hàm CONNECT_DB)
const GET_DB = () => {
  if (!dbInstance) throw new Error('>>> Must connect to MongoDB first.');
  return dbInstance;
};

// Tắt connect database khi cần thiết
const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

module.exports = {
  CONNECT_DB,
  GET_DB,
  CLOSE_DB,
};
