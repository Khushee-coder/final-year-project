const express = require('express');
const router = express.Router();
const { getRooms, updateRoomStatus } = require('../controllers/roomController');

router.get('/', getRooms);
router.put('/:id/status', updateRoomStatus);

module.exports = router;