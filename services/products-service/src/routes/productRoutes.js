const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

// CREATE
router.post('/products', ProductController.createProduct);

// READ - Todos
router.get('/products', ProductController.getAllProducts);

// READ - Por ID
router.get('/products/:id', ProductController.getProductById);

// UPDATE
router.put('/products/:id', ProductController.updateProduct);

// DELETE
router.delete('/products/:id', ProductController.deleteProduct);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Products Service está funcionando correctamente',
    timestamp: new Date().toISOString(),
    service: 'products-service'
  });
});

module.exports = router;
