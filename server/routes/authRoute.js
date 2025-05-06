const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/signin', authController.singin)
router.post('/verifyOPT', authController.verifyOPT)

module.exports = router;