const db = require('../config/database');

const createFoodOrder = async (req, res) => {
    const { room_number, customer_name, customer_email, customer_phone, free_items, paid_items, custom_order, total_amount } = req.body;
    
    // Generate order_id properly (THIS WAS MISSING)
    const order_id = 'FOOD' + Date.now() + Math.floor(Math.random() * 1000);
    const order_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    try {
        const [result] = await db.query(
            `INSERT INTO food_orders (order_id, room_number, customer_name, customer_email, customer_phone, free_items, paid_items, custom_order, total_amount, payment_method, order_time, order_status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pay_at_counter', ?, 'pending')`,
            [order_id, room_number, customer_name, customer_email, customer_phone, free_items, paid_items, custom_order, total_amount, order_time]
        );
        
        res.json({ 
            success: true, 
            order_id: order_id,
            message: 'Food order placed successfully'
        });
        
    } catch (error) {
        console.error('Error creating food order:', error);
        res.status(500).json({ success: false, message: 'Failed to place order: ' + error.message });
    }
};

// Get all food orders (for admin)
const getFoodOrders = async (req, res) => {
    try {
        const [orders] = await db.query(
            `SELECT * FROM food_orders ORDER BY order_time DESC`
        );
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching food orders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    const { order_id } = req.params;
    const { order_status } = req.body;
    
    try {
        await db.query(
            `UPDATE food_orders SET order_status = ? WHERE order_id = ?`,
            [order_status, order_id]
        );
        res.json({ success: true, message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { createFoodOrder, getFoodOrders, updateOrderStatus };