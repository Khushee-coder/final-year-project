const express = require('express');
const router = express.Router();
const { checkAvailability, createBooking, cancelBooking, forceCheckoutByRoom, getBookings, checkoutBooking, getRevenue, markPaymentReceived } = require('../controllers/bookingController');

router.post('/check-availability', checkAvailability);
router.post('/create', createBooking);
router.post('/cancel', cancelBooking);
router.post('/force-checkout-room', forceCheckoutByRoom);
router.get('/', getBookings);  // ← ADD THIS LINE
router.post('/checkout', checkoutBooking);  // ← ADD THIS LINE
router.get('/revenue', getRevenue);
router.put('/mark-paid', markPaymentReceived);

module.exports = router;