const db = require('../config/database');

// GET /api/rooms - Get all rooms with availability
const getRooms = async (req, res) => {
    try {
        const { check_in, check_out } = req.query;
        
        let query = `
            SELECT r.*, 
                CASE 
                    WHEN r.status = 'maintenance' THEN 'maintenance'
                    WHEN EXISTS (
                        SELECT 1 FROM bookings b 
                        WHERE b.room_id = r.id 
                        AND b.status = 'confirmed'
                        AND (
                            (b.check_in <= ? AND b.check_out > ?) OR
                            (b.check_in < ? AND b.check_out >= ?) OR
                            (b.check_in >= ? AND b.check_out <= ?)
                        )
                    ) THEN 'booked'
                    ELSE 'available'
                END as current_status
            FROM rooms r
        `;
        
        const params = [];
        
        if (check_in && check_out) {
            params.push(check_in, check_in, check_out, check_out, check_in, check_out);
        } else {
            query = `SELECT *, status as current_status FROM rooms`;
        }
        
        const [rooms] = await db.query(query, params);
        res.json({ success: true, rooms });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// PUT /api/rooms/:id/status - Update room status (admin)
const updateRoomStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['available', 'maintenance'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    try {
        // Check if room has future bookings before maintenance
        if (status === 'maintenance') {
            const [bookings] = await db.query(
                `SELECT id FROM bookings WHERE room_id = ? AND check_in > CURDATE() AND status = 'confirmed'`,
                [id]
            );
            
            if (bookings.length > 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Cannot set maintenance: Room has future bookings' 
                });
            }
        }
        
        await db.query(`UPDATE rooms SET status = ? WHERE id = ?`, [status, id]);
        res.json({ success: true, message: `Room status updated to ${status}` });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getRooms, updateRoomStatus };