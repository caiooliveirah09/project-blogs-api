// const loginService = require('../services/login.service');
const authService = require('../services/auth.service');

const OK = 200;

const login = async (req, res) => {
  const { email, password, type, message } = authService.validateBody(req.body);
  if (type) return res.status(type).json({ message });
  const token = await authService.validateLogin({ email, password });
  if (token.type) return res.status(token.type).json({ message: token.message });
  return res.status(OK).json({ token });
};

module.exports = {
  login,
};