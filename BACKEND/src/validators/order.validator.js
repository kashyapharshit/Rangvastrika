const { z } = require('zod');

const createOrderSchema = z.object({
  body: z.object({
    customerDetails: z.object({
      name: z.string().optional(),
      mobile: z.string().trim().min(1),
      email: z.string().email(),
      address: z.string().trim().min(1),
    }),
    orderItems: z
      .array(
        z.object({
          product: z.string().min(1),
          name: z.string().trim().min(1),
          image: z.string().optional(),
          quantity: z.number().int().positive(),
          price: z.number().nonnegative(),
        })
      )
      .min(1),
    totalPrice: z.number().nonnegative(),
  }),
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered']),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};
