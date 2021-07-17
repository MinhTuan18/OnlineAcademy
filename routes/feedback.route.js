const express = require('express');
const { feedbackController } = require('../controllers');
const auth = require('../middlewares/auth.mdw');
const router = express.Router();

router.post('/', auth, feedbackController.createFeedback);
router.get('/', feedbackController.queryFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.post('/:id', auth, feedbackController.updateFeedback)
module.exports = router;