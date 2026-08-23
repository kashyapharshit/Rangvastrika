const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const ApiFeatures = require('../utils/ApiFeatures');

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
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

module.exports = {
  getProducts,
  createProduct,
};
