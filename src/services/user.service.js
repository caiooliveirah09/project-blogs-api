const Joi = require('joi');
const { User } = require('../models');

const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;

const validateBody = (params) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  });

  const { error, value } = schema.validate(params);

  if (error) return { type: BAD_REQUEST, message: error.message };

  return value;
};

const checkIfUserAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { type: CONFLICT, message: 'User already registered' };
};

const addNewUser = async ({ displayName, email, password, image, type, message }) => {
  await User.create({ displayName, email, password, image, type, message });
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { type: OK, message: allUsers };
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) return { type: NOT_FOUND, message: 'User does not exist' };
  return { type: OK, message: user };
};

module.exports = {
  validateBody,
  checkIfUserAlreadyExists,
  addNewUser,
  getAllUsers,
  getUserById,
};