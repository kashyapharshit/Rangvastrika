const asyncHandler = require('express-async-handler');
const stripe = require('../config/stripe');

const createPaymentIntent = asyncHandler(async (req, res) => {
  if (!stripe) {
    res.status(503);
    throw new Error('Stripe is not configured');
  }

  const { amount, currency = 'inr' } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });

  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
    id: paymentIntent.id,
  });
});

module.exports = {
  createPaymentIntent,
};
