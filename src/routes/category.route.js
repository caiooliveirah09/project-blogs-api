const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const categoryController = require('../controllers/category.controller');

router.post('/', authMiddleware.validateToken, categoryController.addNewCategory);

module.exports = router;