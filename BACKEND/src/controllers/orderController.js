const asyncHandler = require('express-async-handler');
const Order = require('../models/order');

const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
});

module.exports = {
  createOrder,
  getMyOrders,
};
