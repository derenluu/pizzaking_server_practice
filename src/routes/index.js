const express = require('express');
// const StatusCodes = require('http-status-codes');
const moviesAPIs = require('./movieRoutes');

const Router = express.Router();

// Router.get('/status', (req, res) => {});
Router.use('/movies', moviesAPIs);

module.exports = movies = Router;
