const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const ApiFeatures = require('../utils/apiFeatures');

const getProducts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    image:
      req.body.image ||
      (Array.isArray(req.body.images) && req.body.images.length > 0
        ? req.body.images[0]
        : ''),
  };

  const product = await Product.create(payload);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
  };

  if (Array.isArray(payload.images) && payload.images.length > 0 && !payload.image) {
    payload.image = payload.images[0];
  }

  const product = await Product.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
