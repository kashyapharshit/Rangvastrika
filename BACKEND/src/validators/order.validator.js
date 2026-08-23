const { z } = require('zod');

const createOrderSchema = z.object({
  body: z.object({
    orderItems: z
      .array(
        z.object({
          product: z.string().min(1),
          quantity: z.number().int().positive(),
          price: z.number().nonnegative(),
        })
      )
      .min(1),
    shippingAddress: z.string().optional(),
    totalPrice: z.number().nonnegative(),
  }),
});

module.exports = {
  createOrderSchema,
};
