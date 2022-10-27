const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', userController.addNewUser);
router.get('/', authMiddleware.validateToken, userController.getAllUsers);

module.exports = router;