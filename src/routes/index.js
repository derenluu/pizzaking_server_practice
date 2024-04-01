const express = require('express');
const registerAPIs = require('./registerRoutes');
// const StatusCodes = require('http-status-codes');

const Router = express.Router();

// Router.get('/status', (req, res) => {});
Router.use('/register', registerAPIs);
// Router.use('/user', userAPIs);

module.exports = RouterAPIs = Router;
