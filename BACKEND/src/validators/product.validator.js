const { z } = require('zod');

const commaSeparatedOrArray = z.preprocess((value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
}, z.array(z.string().trim().min(1)));

const productBodySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  sizes: commaSeparatedOrArray.optional(),
  material: z.string().trim().optional(),
  weather: commaSeparatedOrArray.optional(),
  countInStock: z.coerce.number().int().nonnegative().optional(),
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
