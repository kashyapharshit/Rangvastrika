const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createProductSchema } = require('../validators/product.validator');

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, validate(createProductSchema), createProduct);

module.exports = router;
