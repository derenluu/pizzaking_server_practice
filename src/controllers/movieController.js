const StatusCodes = require('http-status-codes');
const ApiError = require('../utils/ApiError');

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    // res.status(StatusCodes.CREATED).json({message: `Note: API post from Controller ${StatusCodes.CREATED}`});
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Test Error OKKKK');
  } catch (error) {
    next(error);
  }
};

module.exports = movieController = {
  createNew,
};
