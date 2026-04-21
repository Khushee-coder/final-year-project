const db = require('../config/database');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

// POST /api/payments/create-order
const createOrder = async (req, res) => {
    const { booking_id, amount } = req.body;
    
    try {
        const [bookings] = await db.query(
            `SELECT * FROM bookings WHERE booking_id = ? AND status = 'pending'`,
            [booking_id]
        );
        
        if (bookings.length === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found or already confirmed' });
        }
        
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: booking_id,
            notes: { booking_id: booking_id }
        };
        
        const order = await razorpay.orders.create(options);
        
        await db.query(
            `INSERT INTO payments (booking_id, razorpay_order_id, amount, status) VALUES (?, ?, ?, 'created')`,
            [booking_id, order.id, amount]
        );
        
        res.json({ success: true, order_id: order.id, amount: order.amount, currency: order.currency, key_id: process.env.RAZORPAY_KEY_ID });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
};

// POST /api/payments/verify
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = req.body;
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
        
        if (expectedSignature !== razorpay_signature) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
        
        await connection.query(
            `UPDATE payments SET razorpay_payment_id = ?, razorpay_signature = ?, status = 'paid' WHERE razorpay_order_id = ?`,
            [razorpay_payment_id, razorpay_signature, razorpay_order_id]
        );
        
        await connection.query(`UPDATE bookings SET status = 'confirmed', payment_status = 'paid' WHERE booking_id = ?`, [booking_id]);
        
        const [booking] = await connection.query(`SELECT room_id FROM bookings WHERE booking_id = ?`, [booking_id]);
        if (booking.length > 0) {
            await connection.query(`UPDATE rooms SET status = 'booked' WHERE id = ?`, [booking[0].room_id]);
        }
        
        await connection.commit();
        res.json({ success: true, message: 'Payment verified and booking confirmed', payment_id: razorpay_payment_id });
        
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    } finally {
        connection.release();
    }
};

// GET /api/payments/status/:booking_id
const getPaymentStatus = async (req, res) => {
    const { booking_id } = req.params;
    
    try {
        const [payments] = await db.query(`SELECT status, razorpay_order_id, razorpay_payment_id FROM payments WHERE booking_id = ?`, [booking_id]);
        res.json({ success: true, payment: payments[0] || null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { createOrder, verifyPayment, getPaymentStatus };