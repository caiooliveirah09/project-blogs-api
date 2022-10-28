const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');

// const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', postController.addNewBlogPost);
module.exports = router;