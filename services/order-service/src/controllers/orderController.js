const Order = require("../models/order");

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, total, status } = req.body;
    const newOrder = await Order.create({ userId, products, total, status });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ - Todas
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Orden no encontrada" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Orden no encontrada" });

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Orden no encontrada" });

    await order.destroy();
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
