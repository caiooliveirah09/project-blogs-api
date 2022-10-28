const express = require('express');

const loginRoute = require('./login.route.js');
const userRoute = require('./user.route.js');
const categoryRoute = require('./category.route.js');
const postRoute = require('./post.route.js');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/categories', categoryRoute);
router.use('/post', postRoute);

module.exports = router;