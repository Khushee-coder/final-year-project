const express = require('express');
const router = express.Router();
const { getFoodItems, addFoodItem, updateFoodItem, deleteFoodItem } = require('../controllers/foodItemController');

router.get('/', getFoodItems);
router.post('/', addFoodItem);
router.put('/:id', updateFoodItem);
router.delete('/:id', deleteFoodItem);

module.exports = router;