const Order = require('../models/order');

// Base de datos simulada (en memoria)
let orders = [
  new Order(1, 1, [{ productId: 2, quantity: 1 }], 3500, 'pendiente'),
  new Order(2, 2, [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }], 6600, 'pagado')
];
let nextId = 3;

class OrderController {
  // CREATE
  static createOrder(req, res) {
    try {
      const { userId, products, total, status } = req.body;
      const newOrder = new Order(nextId, userId, products, total, status);

      const errors = newOrder.validate();
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors
        });
      }

      orders.push(newOrder);
      nextId++;

      res.status(201).json({
        success: true,
        message: 'Orden creada exitosamente',
        data: newOrder.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // READ - Todas
  static getAllOrders(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Órdenes obtenidas exitosamente',
        data: orders.map(o => o.toJSON()),
        total: orders.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // READ - Por ID
  static getOrderById(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const order = orders.find(o => o.id === orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Orden no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Orden obtenida exitosamente',
        data: order.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // UPDATE
  static updateOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const { userId, products, total, status } = req.body;
      const orderIndex = orders.findIndex(o => o.id === orderId);

      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Orden no encontrada'
        });
      }

      const updatedOrder = new Order(orderId, userId, products, total, status, orders[orderIndex].createdAt);

      const errors = updatedOrder.validate();
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors
        });
      }

      orders[orderIndex] = updatedOrder;

      res.status(200).json({
        success: true,
        message: 'Orden actualizada exitosamente',
        data: updatedOrder.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE
  static deleteOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const orderIndex = orders.findIndex(o => o.id === orderId);

      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Orden no encontrada'
        });
      }

      const deletedOrder = orders.splice(orderIndex, 1)[0];

      res.status(200).json({
        success: true,
        message: 'Orden eliminada exitosamente',
        data: deletedOrder.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
}

module.exports = OrderController;
