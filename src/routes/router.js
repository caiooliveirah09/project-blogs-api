const express = require('express');

const loginRoute = require('./login.route');
const userRoute = require('./user.route.js');
const categoryRoute = require('./category.route.js');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/categories', categoryRoute);

module.exports = router;