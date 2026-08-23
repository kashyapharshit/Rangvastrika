const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

const createOrder = asyncHandler(async (req, res) => {
  const customerDetails = {
    name: req.body.customerDetails?.name || '',
    mobile: req.body.customerDetails?.mobile,
    email: req.body.customerDetails?.email,
    address: req.body.customerDetails?.address,
  };

  const orderItems = (req.body.orderItems || []).map((item) => ({
    product: item.product,
    name: item.name,
    image: item.image || '',
    quantity: item.quantity,
    price: item.price,
  }));

  const order = await Order.create({
    user: req.user._id,
    customerDetails,
    orderItems,
    shippingAddress: customerDetails.address,
    totalPrice: req.body.totalPrice,
    status: 'Pending',
  });

  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort('-createdAt');
  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = req.body.status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
};
