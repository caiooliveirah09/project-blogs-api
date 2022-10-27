const authService = require('../services/auth.service');

const UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const { type, message } = authService.validateToken(authorization);
  if (type === UNAUTHORIZED) return res.status(type).json({ message });
  next();
};

module.exports = { validateToken };