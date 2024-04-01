const Joi = require('joi');
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');

const registerNewAccount = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().required().trim().strict(),
    password: Joi.string().required().trim().strict().min(6),
    tel: Joi.string().required().trim().strict(),
    address: Joi.string().required().trim().strict(),
  });

  try {
    const validatedData = await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    validatedData.password = await bcrypt.hash(validatedData.password, 12);
    req.body = validatedData;
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    );
    next(customError);
  }
};

module.exports = registerValidate = {
  registerNewAccount,
};
