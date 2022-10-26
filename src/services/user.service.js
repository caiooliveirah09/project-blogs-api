const Joi = require('joi');
const { User } = require('../models');

const BAD_REQUEST = 400;
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

module.exports = {
  validateBody,
  checkIfUserAlreadyExists,
  addNewUser,
};