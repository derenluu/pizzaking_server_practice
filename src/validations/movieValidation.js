const Joi = require('joi');
const StatusCodes = require('http-status-codes');
const ApiError = require('../utils/ApiError');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict(),
  });

  try {
    // set abortEarly: false >> chỉ định có trả về tất cả lỗi validation
    await correctCondition.validateAsync(req.body, {abortEarly: false});

    // next() chuyển sang tầng controller
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
  }
};

module.exports = movieValidate = {
  createNew,
};
