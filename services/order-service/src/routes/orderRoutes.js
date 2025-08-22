const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();

// CREATE
router.post('/orders', OrderController.createOrder);

// READ - Todas
router.get('/orders', OrderController.getAllOrders);

// READ - Por ID
router.get('/orders/:id', OrderController.getOrderById);

// UPDATE
router.put('/orders/:id', OrderController.updateOrder);

// DELETE
router.delete('/orders/:id', OrderController.deleteOrder);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Order Service está funcionando correctamente',
    timestamp: new Date().toISOString(),
    service: 'order-service'
  });
});

module.exports = router;
