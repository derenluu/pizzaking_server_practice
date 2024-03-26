require('dotenv').config();

// Sử dụng process.env
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

// const connectionDB = require(connectionDB);

// Cấu hình template engine
configViewEngine(app);

// Khai báo routes
app.use('/v1', webRoutes);

app.listen(port, hostname, () => {
  console.log(`Ứng dụng đang chạy trên cổng ${hostname}:${port}`);
});
