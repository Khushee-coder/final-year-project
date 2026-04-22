const express = require('express');
const router = express.Router();
const { createFoodOrder, getFoodOrders, updateOrderStatus } = require('../controllers/foodOrderController');

router.post('/create', createFoodOrder);
router.get('/', getFoodOrders);
router.put('/:order_id/status', updateOrderStatus);

module.exports = router;