const express = require('express');
const StatusCodes = require('http-status-codes');
const registerValidate = require('../validations/registerValidation');
const registerController = require('../controllers/registerController');

const Router = express.Router();

Router.route('/')
  .get((req, res, next) => {
    res
      .status(StatusCodes.OK)
      .json({ message: `Note: API get ${StatusCodes.OK}` });
  })
  .post(
    registerValidate.registerNewAccount,
    registerController.registerNewAccount
  );

module.exports = registerAPIs = Router;
