const express = require('express');
const router = express.Router();
const { getRooms, updateRoomStatus, forceRoomAvailable } = require('../controllers/roomController');

router.get('/', getRooms);
router.put('/:id/status', updateRoomStatus);
router.put('/:id/force-available', forceRoomAvailable);  // Add this line

module.exports = router;