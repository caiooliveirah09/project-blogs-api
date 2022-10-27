const userService = require('../services/user.service');
const authService = require('../services/auth.service');

const CREATED = 201;
const NOT_FOUND = 404;

const addNewUser = async (req, res) => {
  const { email, password, type, message } = userService.validateBody(req.body);
  if (type) return res.status(type).json({ message });
  const user = await userService.checkIfUserAlreadyExists(email);
  if (user) return res.status(user.type).json({ message: user.message });
  await userService.addNewUser(req.body);
  const token = await authService.validateLogin({ email, password });
  if (token.type) return res.status(token.type).json({ message: token.message });
  return res.status(CREATED).json({ token });
};

const getAllUsers = async (req, res) => {
  const { type, message } = await userService.getAllUsers(); 
  return res.status(type).json(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  if (type === NOT_FOUND) return res.status(type).json({ message });
  return res.status(type).json(message);
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
};
