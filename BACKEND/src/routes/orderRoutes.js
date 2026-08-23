const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require('../validators/order.validator');

const router = express.Router();

router
  .route('/')
  .post(protect, validate(createOrderSchema), createOrder)
  .get(protect, admin, getOrders);

router.get('/my-orders', protect, getMyOrders);
router.patch(
  '/:id/status',
  protect,
  admin,
  validate(updateOrderStatusSchema),
  updateOrderStatus
);

module.exports = router;
