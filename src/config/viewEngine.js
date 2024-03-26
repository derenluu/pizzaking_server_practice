const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
  // Cấu hình template engine
  app.set('views', path.join('./src', '/views'));
  app.set('view engine', 'ejs');

  // Cấu hình static file (các file, folder nằm trong Public đều được truy cập từ client)
  app.use(express.static(path.join('./src', 'public')));
};

module.exports = configViewEngine;
