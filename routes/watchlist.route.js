const express = require('express');
const { watchListcontroller } = require('../controllers');
const { auth } = require('../middlewares/auth.mdw');

const router = express.Router();

router.post('/:id', auth, watchListcontroller.addNewCourseToWatchList);
router.delete('/:id', auth, watchListcontroller.deleteCourseFromWatchList);
router.get('/my', auth, watchListcontroller.getMyWatchList);


module.exports = router;
