const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  createProductSchema,
  updateProductSchema,
} = require('../validators/product.validator');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, validate(createProductSchema), createProduct);

router
  .route('/:id')
  .put(protect, admin, validate(updateProductSchema), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
