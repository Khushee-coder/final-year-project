const db = require('../config/database');
const { sendBookingConfirmation } = require('../config/email');
const razorpay = require('../config/razorpay');

// POST /api/bookings/check-availability
const checkAvailability = async (req, res) => {
    const { room_id, check_in, check_out } = req.body;
    
    try {
        // Check if room exists and not in maintenance
        const [room] = await db.query(
            `SELECT status FROM rooms WHERE id = ?`,
            [room_id]
        );
        
        if (room.length === 0 || room[0].status === 'maintenance') {
            return res.json({ success: true, available: false });
        }
        
        // Check for overlapping bookings (including same dates)
        const [overlaps] = await db.query(
            `SELECT id FROM bookings 
             WHERE room_id = ? 
             AND status = 'confirmed'
             AND check_in < ? 
             AND check_out > ?`,
            [room_id, check_out, check_in]
        );
        
        res.json({ success: true, available: overlaps.length === 0 });
        
    } catch (error) {
        console.error('Availability check error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/bookings/create
const createBooking = async (req, res) => {
    const { room_id, guest_name, guest_phone, guest_email, guests, check_in, check_out, total_amount, payment_method } = req.body;
    
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        
        // Double-check availability with lock
        const [overlaps] = await connection.query(
            `SELECT id FROM bookings 
             WHERE room_id = ? 
             AND status = 'confirmed'
             AND check_in < ? 
             AND check_out > ?
             FOR UPDATE`,
            [room_id, check_out, check_in]
        );
        
        if (overlaps.length > 0) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'Room already booked for these dates' });
        }
        
        // Check if room is in maintenance
        const [room] = await connection.query(
            `SELECT status FROM rooms WHERE id = ? FOR UPDATE`,
            [room_id]
        );
        
        if (room[0]?.status === 'maintenance') {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'Room under maintenance' });
        }
        
        const nights = Math.ceil((new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24));
        const bookingId = 'SHH' + Date.now() + Math.floor(Math.random() * 1000);
        
        // Determine status based on payment method
        const bookingStatus = payment_method === 'pay_at_venue' ? 'confirmed' : 'pending';
        const paymentStatus = 'pending';
        
        // ========== UPDATED INSERT QUERY WITH payment_method ==========
        await connection.query(
            `INSERT INTO bookings (booking_id, room_id, guest_name, guest_phone, guest_email, guests, check_in, check_out, nights, total_amount, status, payment_status, payment_method)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [bookingId, room_id, guest_name, guest_phone, guest_email, guests, check_in, check_out, nights, total_amount, bookingStatus, paymentStatus, payment_method]
        );
        // ========== END OF UPDATE ==========
        
        await connection.commit();
        try {
    await sendBookingConfirmation({
        guestEmail: guest_email,
        guestName: guest_name,
        bookingId: bookingId,
        roomNumber: room_id,
        checkIn: check_in,
        checkOut: check_out,
        guests: guests,
        totalAmount: total_amount,
        paymentMethod: payment_method === 'pay_at_venue' ? 'Pay at Venue' : 'Razorpay'
    });
    console.log('Email sent to:', guest_email);
} catch (emailError) {
    console.error('Email failed:', emailError.message);
    // Don't block booking if email fails
}
        res.json({ success: true, booking_id: bookingId, total_amount });
        
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        connection.release();
    }
};

// POST /api/bookings/cancel
const cancelBooking = async (req, res) => {
    const { booking_id } = req.body;
    const connection = await db.getConnection();
    const razorpay = require('../config/razorpay');
    
    try {
        await connection.beginTransaction();
        
        const [bookings] = await connection.query(
            `SELECT b.*, p.razorpay_payment_id 
             FROM bookings b 
             LEFT JOIN payments p ON b.booking_id = p.booking_id
             WHERE b.booking_id = ? AND b.status = 'confirmed'`,
            [booking_id]
        );
        
        if (bookings.length === 0) {
            await connection.rollback();
            return res.status(404).json({ success: false, message: 'Booking not found or already cancelled' });
        }
        
        const booking = bookings[0];
        const checkInDate = new Date(booking.check_in);
        const today = new Date();
        const hoursDiff = (checkInDate - today) / (1000 * 60 * 60);
        
        let refundAmount = 0;
        
        // Razorpay paid bookings - calculate refund
        if (booking.payment_status === 'paid' && booking.payment_method === 'razorpay') {
            if (hoursDiff > 48) {
                refundAmount = booking.total_amount;
            } else if (hoursDiff > 24) {
                refundAmount = Math.floor(booking.total_amount * 0.5);
            } else {
                refundAmount = 0;
            }
            
            // Process Razorpay refund
            if (refundAmount > 0 && booking.razorpay_payment_id) {
                try {
                    await razorpay.payments.refund(booking.razorpay_payment_id, {
                        amount: refundAmount * 100,
                        speed: 'normal'
                    });
                    console.log(`Refund processed for ${booking_id}`);
                } catch (err) {
                    console.error('Refund failed:', err.message);
                }
            }
        }
        
        // Set status to 'cancelled'
        await connection.query(
            `UPDATE bookings SET status = 'cancelled', refund_amount = ? WHERE booking_id = ?`,
            [refundAmount, booking_id]
        );
        
        // Make room available
        await connection.query(`UPDATE rooms SET status = 'available' WHERE id = ?`, [booking.room_id]);
        
        await connection.commit();
        
        let message = refundAmount > 0 ? `Booking cancelled. Refund of ₹${refundAmount} processed.` : 'Booking cancelled.';
        res.json({ success: true, message: message, refund_amount: refundAmount });
        
    } catch (error) {
        await connection.rollback();
        console.error('Cancel error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        connection.release();
    }
};

// Force checkout by room ID
const forceCheckoutByRoom = async (req, res) => {
    const { room_id } = req.body;
    
    try {
        // Find active booking for this room
        const [bookings] = await db.query(
            `SELECT booking_id FROM bookings 
             WHERE room_id = ? AND status = 'confirmed' AND check_out > CURDATE()`,
            [room_id]
        );
        
        if (bookings.length === 0) {
            // Just update room status
            await db.query(`UPDATE rooms SET status = 'available' WHERE id = ?`, [room_id]);
            return res.json({ success: true, message: 'Room set to available (no active booking found)' });
        }
        
        // Update booking to completed
        await db.query(
            `UPDATE bookings SET status = 'completed' WHERE booking_id = ?`,
            [bookings[0].booking_id]
        );
        
        // Update room status
        await db.query(`UPDATE rooms SET status = 'available' WHERE id = ?`, [room_id]);
        
        res.json({ success: true, message: 'Room checked out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/bookings - Get all bookings
const getBookings = async (req, res) => {
    try {
        const db = require('../config/database');
        const [bookings] = await db.query(
            `SELECT b.*, r.room_number 
             FROM bookings b 
             JOIN rooms r ON b.room_id = r.id 
             ORDER BY b.created_at DESC`
        );
        res.json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/bookings/checkout - Mark booking as checked out
const checkoutBooking = async (req, res) => {
    const { booking_id } = req.body;
    const db = require('../config/database');
    
    try {
        // Set status to 'completed' for checkout
        const [result] = await db.query(
            `UPDATE bookings SET status = 'completed' WHERE booking_id = ? AND status = 'confirmed'`,
            [booking_id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found or already checked out' });
        }
        
        const [booking] = await db.query(`SELECT room_id FROM bookings WHERE booking_id = ?`, [booking_id]);
        
        if (booking.length > 0) {
            const [otherBookings] = await db.query(
                `SELECT id FROM bookings 
                 WHERE room_id = ? AND status = 'confirmed' AND check_out > CURDATE()`,
                [booking[0].room_id]
            );
            
            if (otherBookings.length === 0) {
                await db.query(`UPDATE rooms SET status = 'available' WHERE id = ?`, [booking[0].room_id]);
            }
        }
        
        res.json({ success: true, message: 'Booking checked out successfully' });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/bookings/revenue
const getRevenue = async (req, res) => {
    try {
        // Revenue = all paid bookings that are NOT cancelled (refunded)
        const [result] = await db.query(
            `SELECT SUM(total_amount) as total 
             FROM bookings 
             WHERE payment_status = 'paid' 
             AND status != 'cancelled'`,
            []
        );
        res.json({ success: true, total: result[0]?.total || 0 });
    } catch (error) {
        console.error('Revenue error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/bookings/mark-paid
const markPaymentReceived = async (req, res) => {
    const { booking_id } = req.body;
    
    try {
        const [result] = await db.query(
            `UPDATE bookings SET payment_status = 'paid' 
             WHERE booking_id = ? AND payment_status = 'pending'`,
            [booking_id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found or already paid' 
            });
        }
        
        // Also update the room status if needed
        const [booking] = await db.query(
            `SELECT room_id FROM bookings WHERE booking_id = ?`,
            [booking_id]
        );
        
        if (booking.length > 0) {
            await db.query(
                `UPDATE rooms SET status = 'available' WHERE id = ?`,
                [booking[0].room_id]
            );
        }
        
        res.json({ success: true, message: 'Payment marked as received' });
        
    } catch (error) {
        console.error('Mark payment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { checkAvailability, createBooking, cancelBooking, forceCheckoutByRoom, getBookings, checkoutBooking, getRevenue, markPaymentReceived };