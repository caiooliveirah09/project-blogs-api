const express = require('express');

const loginRoute = require('./login.route');

// const authMiddleware = require('../middlewares/auth.middleware');

const userRoute = require('./user.route.js');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);

// router.use(authMiddleware.validateToken);

module.exports = router;