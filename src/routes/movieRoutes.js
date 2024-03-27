const StatusCodes = require('http-status-codes');
const express = require('express');
const movieValidate = require('../validations/movieValidation');
const movieController = require('../controllers/movieController');

const Router = express.Router();

Router.route('/')
  .get((req, res, next) => {
    res.status(StatusCodes.OK).json({message: `Note: API get ${StatusCodes.OK}`});
  })
  .post(movieValidate.createNew, movieController.createNew);

module.exports = moviesAPIs = Router;
