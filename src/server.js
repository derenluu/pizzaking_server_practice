require('dotenv').config();

const express = require('express');
const cors = require('cors');
const exitHook = require('async-exit-hook');
const corsOptions = require('./config/cors');
const env = require('./config/environment');
const RouterAPIs = require('./routes');
const errorHandlingMiddleware = require('./middlewares/errorHandling');
const { CONNECT_DB, GET_DB, CLOSE_DB } = require('./config/mongoDb');
// const configViewEngine = require('./config/viewEngine');
// const {getHomePage} = require('./controllers/movieController');

const START_SERVER = () => {
  const app = express();

  // Cấu hình CORS
  app.use(cors(corsOptions));

  // Cấu hình template engine
  // configViewEngine(app);

  // Enable req.body json data
  app.use(express.json());

  app.use('/api', RouterAPIs);

  // Middlewares xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);
  if (process.env.BUILD_MODE === 'production') {
    // môi trường production
    app.listen(process.env.LOCAL_DEV_APP_PORT, () => {
      console.log(
        `>>> Backend Server running successfully at PORT: ${process.env.LOCAL_DEV_APP_PORT}`
      );
    });
  } else {
    // môi trường dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `>>> Backend Server running successfully at: http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`
      );
    });
  }

  // Thực hiện các tác vụ clenup trước khi dừng server
  // npm async-exit-hook
  exitHook(() => {
    console.log('Server is shuting down');
    CLOSE_DB();
    console.log('Disconnected from MongoDB');
  });
};

// Chạy hàm CONNECT_DB -> chỉ khi connect thành công log ra thông báo -> sau đó mới chạy SERVER
// Nếu lỗi -> dùng hàm process.exit(0) -> dừng server
// Có 2 cách viết

// >>> Cách 1 (IIFE JavaScript -> Immediately-invoked / Anonymous Async Functions)
(async () => {
  try {
    await CONNECT_DB();
    console.log('Connected to database MongoDB');

    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

// >>> Cách 2 (try / catch basic)
// CONNECT_DB()
//   .then(() => console.log('Connected to database MongoDB'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   });
