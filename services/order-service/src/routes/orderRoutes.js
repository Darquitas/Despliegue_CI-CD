const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const router = express.Router();

// CRUD Orders
router.post("/orders", createOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

// Health check
router.get("/health", (req, res) => {
  res.json({ success: true, service: "order-service", timestamp: new Date().toISOString() });
});

module.exports = router;
