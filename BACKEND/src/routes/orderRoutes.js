const express = require('express');
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createOrderSchema } = require('../validators/order.validator');

const router = express.Router();

router.route('/').post(protect, validate(createOrderSchema), createOrder);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
