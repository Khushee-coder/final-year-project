const db = require('../config/database');

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
    const { room_id, guest_name, guest_phone, guest_email, guests, check_in, check_out, total_amount } = req.body;
    
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
        
        await connection.query(
            `INSERT INTO bookings (booking_id, room_id, guest_name, guest_phone, guest_email, guests, check_in, check_out, nights, total_amount, status, payment_status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')`,
            [bookingId, room_id, guest_name, guest_phone, guest_email, guests, check_in, check_out, nights, total_amount]
        );
        
        await connection.commit();
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
    
    try {
        await connection.beginTransaction();
        
        const [bookings] = await connection.query(
            `SELECT b.*, r.base_price, p.razorpay_payment_id, p.amount as paid_amount 
             FROM bookings b 
             JOIN rooms r ON b.room_id = r.id
             LEFT JOIN payments p ON b.booking_id = p.booking_id
             WHERE b.booking_id = ? AND b.status != 'cancelled'`,
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
        
        let refundPercentage = 0;
        let refundAmount = 0;
        
        if (hoursDiff > 48) {
            refundPercentage = 100;
        } else if (hoursDiff > 24) {
            refundPercentage = 50;
        } else {
            refundPercentage = 0;
        }
        
        refundAmount = Math.floor(booking.total_amount * refundPercentage / 100);
        
        await connection.query(
            `UPDATE bookings SET status = 'cancelled', refund_amount = ? WHERE booking_id = ?`,
            [refundAmount, booking_id]
        );
        
        await connection.commit();
        res.json({ 
            success: true, 
            message: `Booking cancelled. Refund amount: ₹${refundAmount}`,
            refund_amount: refundAmount,
            refund_percentage: refundPercentage
        });
        
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        connection.release();
    }
};

module.exports = { checkAvailability, createBooking, cancelBooking };