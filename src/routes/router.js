const express = require('express');

const loginRoute = require('./login.route');

// const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use('/login', loginRoute);

// router.use(authMiddleware.validateToken);

module.exports = router;