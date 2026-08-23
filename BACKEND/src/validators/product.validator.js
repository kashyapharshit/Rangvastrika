const { z } = require('zod');

const productBodySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  countInStock: z.number().int().nonnegative().optional(),
});

const createProductSchema = z.object({
  body: productBodySchema,
});

const updateProductSchema = z.object({
  body: productBodySchema.partial(),
  params: z.object({
    id: z.string().min(1),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
