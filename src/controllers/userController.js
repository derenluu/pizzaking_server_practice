const StatusCodes = require('http-status-codes');
const ApiError = require('../utils/ApiError');
const userService = require('../services/userService');

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createUser);
  } catch (error) {
    next(error);
  }
};

module.exports = userController = {
  createNew,
};
