const StatusCodes = require('http-status-codes');
const express = require('express');
const userValidate = require('../validations/userValidation');
const userController = require('../controllers/userController');

const Router = express.Router();

Router.route('/')
  .get((req, res, next) => {
    res.status(StatusCodes.OK).json({message: `Note: API get ${StatusCodes.OK}`});
  })
  .post(userValidate.createNew, userController.createNew);

module.exports = userAPIs = Router;
