const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const roomRoutes = require('./src/routes/roomRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const foodOrderRoutes = require('./src/routes/foodOrderRoutes');
const foodItemRoutes = require('./src/routes/foodItemRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ SETTINGS ROUTES (MOVE THESE HERE - BEFORE OTHER ROUTES) ============
app.get('/api/settings', async (req, res) => {
    try {
        const db = require('./src/config/database');
        const [settings] = await db.query(`SELECT * FROM settings WHERE id = 1`);
        res.json({ success: true, settings: settings[0] || { ac_price: 2500 } });
    } catch (error) {
        res.json({ success: true, settings: { ac_price: 2500 } });
    }
});

app.put('/api/settings/prices', async (req, res) => {
    const { ac } = req.body;
    try {
        const db = require('./src/config/database');
        await db.query(`INSERT INTO settings (id, ac_price) VALUES (1, ?) ON DUPLICATE KEY UPDATE ac_price = ?`, [ac, ac]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving price:', error);
        res.status(500).json({ success: false });
    }
});
// ============ END OF SETTINGS ROUTES ============

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/food-orders', foodOrderRoutes);
app.use('/api/food-items', foodItemRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 API available at http://localhost:${PORT}/api/health`);
});