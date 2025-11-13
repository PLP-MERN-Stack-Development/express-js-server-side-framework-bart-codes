const { NotFoundError, ValidationError } = require('../utils/errors');

let products = [];
let nextId = 1;

// GET /api/products - List all products with category filter and pagination
const getAllProducts = (req, res) => {
  let filtered = [...products];
  const { category } = req.query;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;

  const paginatedProducts = filtered.slice(startIdx, endIdx);

  res.json({
    products: paginatedProducts,
    currentPage: page,
    totalPages: Math.ceil(filtered.length / limit),
    totalProducts: filtered.length
  });
};

// GET /api/products/:id - Get a specific product by ID
const getProductById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.json(product);
};

// POST /api/products - Create a new product
const createProduct = (req, res) => {
  const product = {
    id: nextId++,
    ...req.body
  };
  products.push(product);
  res.status(201).json(product);
};

// PUT /api/products/:id - Update an existing product
const updateProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

// DELETE /api/products/:id - Delete a product
const deleteProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  products.splice(index, 1);
  res.status(204).send();
};

// GET /api/products/search - Search products by name
const searchProducts = (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: { message: 'Query parameter "q" is required' } });
  }
  const searched = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  res.json({ products: searched });
};

// GET /api/products/stats - Get product statistics (count by category)
const getStats = (req, res) => {
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ stats });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats
};