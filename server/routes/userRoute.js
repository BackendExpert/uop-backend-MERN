const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const { accessMiddleware } = require('../middlewares/AccessMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/allusers', authMiddleware, accessMiddleware(['dvc', 'admin']), userController.getallusers)
router.patch('/updateUserStatus', authMiddleware, accessMiddleware(['dvc', 'admin']), userController.active_deactive_user)

module.exports = router;