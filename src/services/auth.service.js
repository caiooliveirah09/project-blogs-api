const Joi = require('joi');
const jwtUtil = require('../utils/jwt.utils');

const { User } = require('../models');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const validateBody = (params) => {
  const schema = Joi.object({
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(params);

  if (error) return { type: BAD_REQUEST, message: 'Some required fields are missing' };

  return value;
};

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return { type: BAD_REQUEST, message: 'Invalid fields' };
  }
  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = jwtUtil.createToken(userWithoutPassword);

  return token;
};

const validateToken = (token) => {
  if (!token) return { type: UNAUTHORIZED, message: 'Token not found' };
  const user = jwtUtil.validateToken(token);
  if (user.type) return { type: UNAUTHORIZED, message: 'Expired or invalid token' };
  return user;
};

module.exports = {
  validateBody,
  validateLogin,
  validateToken,
};