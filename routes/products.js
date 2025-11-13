const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats
} = require('../controllers/productsController');
const validateProduct = require('../middleware/validation');

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// POST /api/products
router.post('/', validateProduct, createProduct);

// PUT /api/products/:id
router.put('/:id', validateProduct, updateProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

// GET /api/products/search?q=term
router.get('/search', searchProducts);

// GET /api/products/stats
router.get('/stats', getStats);

module.exports = router;