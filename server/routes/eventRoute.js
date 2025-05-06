const express = require('express');
const { authMiddleware } = require('../middlewares/AuthMiddleware');
const { accessMiddleware } = require('../middlewares/AccessMiddleware');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/createEvent', authMiddleware, accessMiddleware(['dvc', 'admin', 'user']), eventController.createEvent)
router.get('/allevents', authMiddleware, accessMiddleware(['dvc', 'admin']), eventController.getallEvent)
router.get('/addevents/:email', authMiddleware, accessMiddleware(['dvc', 'admin', 'user']), eventController.geteventaddby)
router.patch('/toggleAcceptEvent/:id', authMiddleware, accessMiddleware(['dvc', 'admin']), eventController.acceptRejectEvent)
router.put('/updateEvent/:id', authMiddleware, accessMiddleware(['dvc', 'admin', 'user']), eventController.updateEvent)
router.get('/visibleEvents', eventController.activeEvents)

module.exports = router;
