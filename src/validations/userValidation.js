const Joi = require('joi');
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().trim().strict(),
    email: Joi.string().required().trim().strict(),
    password: Joi.string().required().trim().strict().min(6),
  });

  try {
    // Validate dữ liệu đầu vào
    const validatedData = await correctCondition.validateAsync(req.body, {abortEarly: false});

    // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
    validatedData.password = await bcrypt.hash(validatedData.password, 12);

    // Gán dữ liệu đã được validate và mã hóa mật khẩu vào request body
    req.body = validatedData;

    // Tiếp tục tới tầng controller
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
  }
};

module.exports = userValidate = {
  createNew,
};
