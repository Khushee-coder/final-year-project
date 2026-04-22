const db = require('../config/database');

// Get all food items
const getFoodItems = async (req, res) => {
    try {
        const [vegItems] = await db.query(
            "SELECT * FROM food_items WHERE type = 'veg' ORDER BY id"
        );
        const [nonVegItems] = await db.query(
            "SELECT * FROM food_items WHERE type = 'nonveg' ORDER BY id"
        );
        
        res.json({
            success: true,
            veg: vegItems,
            nonVeg: nonVegItems
        });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add new food item
const addFoodItem = async (req, res) => {
    const { name, type, price, image_url, description, is_free } = req.body;
    
    try {
        const [result] = await db.query(
            `INSERT INTO food_items (name, type, price, image_url, description, is_free) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, type, price || 0, image_url || '', description || '', is_free || false]
        );
        
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('Error adding food item:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update food item
const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, image_url, description, is_free } = req.body;
    
    try {
        await db.query(
            `UPDATE food_items SET name = ?, type = ?, price = ?, image_url = ?, description = ?, is_free = ? WHERE id = ?`,
            [name, type, price || 0, image_url || '', description || '', is_free || false, id]
        );
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating food item:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete food item
const deleteFoodItem = async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query("DELETE FROM food_items WHERE id = ?", [id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getFoodItems, addFoodItem, updateFoodItem, deleteFoodItem };