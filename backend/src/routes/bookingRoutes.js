const express = require('express');
const router = express.Router();
const { checkAvailability, createBooking, cancelBooking } = require('../controllers/bookingController');

router.post('/check-availability', checkAvailability);
router.post('/create', createBooking);
router.post('/cancel', cancelBooking);

module.exports = router;