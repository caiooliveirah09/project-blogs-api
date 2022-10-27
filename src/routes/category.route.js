const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const categoryController = require('../controllers/category.controller');

router.post('/', authMiddleware.validateToken, categoryController.addNewCategory);

router.get('/', authMiddleware.validateToken, categoryController.getAllCategories);

module.exports = router;