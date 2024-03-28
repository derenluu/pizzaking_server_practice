// const Joi = require('joi');
// const StatusCodes = require('http-status-codes');
const ApiError = require('../utils/ApiError');
const slugify = require('../utils/formatterers');
const userModel = require('../models/userModel');

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody,
      // slug: slugify(reqBody.title),
    };

    // Gọi tới tầng Models để tạo mới 1 dòng trong database
    const createdUser = await userModel.createNew(newUser);

    // Lấy lại dòng vừa tạo từ tầng Models
    const getNewUser = await userModel.findOneById(createdUser.insertedId);

    return getNewUser;
  } catch (error) {
    throw error;
  }
};

module.exports = movieService = {
  createNew,
};
