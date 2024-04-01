const StatusCodes = require('http-status-codes');
const ApiError = require('../utils/ApiError');
// const userService = require('../services/userService');

const registerNewAccount = async (req, res, next) => {
  //   console.log(req.body);
  //   try {
  //     const createUser = await userService.createNew(req.body);
  //     res.status(StatusCodes.CREATED).json(createUser);
  //   } catch (error) {
  //     next(error);
  //   }
};

module.exports = registerController = {
  registerNewAccount,
};
