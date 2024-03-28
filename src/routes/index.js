const express = require('express');
// const StatusCodes = require('http-status-codes');
const userAPIs = require('./userRoutes');

const Router = express.Router();

// Router.get('/status', (req, res) => {});
Router.use('/user', userAPIs);

module.exports = user = Router;
