require('dotenv').config();

const express = require('express');
const {CONNECT_DB, GET_DB, CLOSE_DB} = require('./config/mongoDb');
// const configViewEngine = require('./config/viewEngine');
// const {getHomePage} = require('./controllers/movieController');
const exitHook = require('async-exit-hook');
const env = require('./config/environment');
const movies = require('./routes');
const errorHandlingMiddleware = require('./middlewares/errorHandling');

const START_SERVER = () => {
  const app = express();

  // Cấu hình template engine
  // configViewEngine(app);

  // Enable req.body json data
  app.use(express.json());

  app.use('/api', movies);

  // Middlewares xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  // app.use('/v1', async (req, res, next) => {
  //   // console.log(await GET_DB().listCollections().toArray());
  //   // getHomePage();
  //   res.send('hello pro');
  //   console.log(`>>> Hi ${env.AUTHOR}`);
  // });

  app.listen(env.PORT, env.HOSTNAME, () => {
    console.log(`>>> Ứng dụng đang chạy trên cổng ${env.HOSTNAME}:${env.PORT}`);
  });

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
