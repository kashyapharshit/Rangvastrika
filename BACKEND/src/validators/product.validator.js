const { z } = require('zod');

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    image: z.string().optional(),
    category: z.string().optional(),
    countInStock: z.number().int().nonnegative().optional(),
  }),
});

module.exports = {
  createProductSchema,
};
