const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get settings
router.get('/', async (req, res) => {
    try {
        const [settings] = await db.query(`SELECT * FROM settings WHERE id = 1`);
        res.json({ success: true, settings: settings[0] || {} });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// Update prices
router.put('/prices', async (req, res) => {
    const { ac } = req.body;
    try {
        await db.query(`INSERT INTO settings (id, ac_price) VALUES (1, ?) ON DUPLICATE KEY UPDATE ac_price = ?`, [ac, ac]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;