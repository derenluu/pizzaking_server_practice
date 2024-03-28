const Joi = require('joi');
const bcrypt = require('bcrypt');
const {GET_DB} = require('../config/mongoDb');
const {ObjectId} = require('mongodb');
const {OBJECT_ID_RULE} = require('../utils/validators');

const SALT_ROUNDS = 12; // Số lượt lấy cho bcrypt
const COLLECTION_NAME = 'users';
const COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().trim().strict(),
  email: Joi.string().required().trim().strict(),
  password: Joi.string().required().trim().strict().min(6),
});

const validateBeforeCreate = async (data) => {
  // Validate dữ liệu trước khi lưu vào cơ sở dữ liệu
  const validData = await COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false});

  // Băm mật khẩu
  const hashedPassword = await bcrypt.hash(validData.password, SALT_ROUNDS);

  // Thêm mật khẩu đã băm vào đối tượng dữ liệu
  validData.password = hashedPassword;
  return validData;
};

const createNew = async (data) => {
  try {
    // Validation dữ liệu thêm 1 lần nữa
    const validData = await validateBeforeCreate(data);

    // Thêm mới người dùng vào cơ sở dữ liệu
    const createdUser = await GET_DB().collection(COLLECTION_NAME).insertOne(validData);
    return createdUser;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = userModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  createNew,
  findOneById,
};
