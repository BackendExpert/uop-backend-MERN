const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const { accessMiddleware } = require('../middlewares/AccessMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/allusers', authMiddleware, accessMiddleware(['dvc', 'admin']), userController.getallusers)

module.exports = router;