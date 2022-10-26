const authService = require('../services/auth.service');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  authService.validateToken(authorization);
  next();
};

module.exports = { validateToken };