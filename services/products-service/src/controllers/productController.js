const Product = require('../models/product');

// Base de datos simulada (en memoria)
let products = [
  new Product(1, 'Teclado Mecánico', 'Periféricos', 1200, 10, 'Teclado RGB con switches azules'),
  new Product(2, 'Monitor 24"', 'Pantallas', 3500, 5, 'Monitor IPS Full HD'),
  new Product(3, 'Procesador Ryzen 5', 'Procesadores', 4200, 8, 'Procesador AMD Ryzen 5 5600X')
];
let nextId = 4;

class ProductController {
  // CREATE
  static createProduct(req, res) {
    try {
      const { name, category, price, stock, description } = req.body;
      const newProduct = new Product(nextId, name, category, price, stock, description);

      const errors = newProduct.validate();
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors
        });
      }

      // Verificar si el nombre ya existe
      const existingProduct = products.find(p => p.name === name);
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: 'El nombre del producto ya está registrado'
        });
      }

      products.push(newProduct);
      nextId++;

      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: newProduct.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // READ - Todos
  static getAllProducts(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        data: products.map(p => p.toJSON()),
        total: products.length
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
  static getProductById(req, res) {
    try {
      const productId = parseInt(req.params.id);
      const product = products.find(p => p.id === productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Producto obtenido exitosamente',
        data: product.toJSON()
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
  static updateProduct(req, res) {
    try {
      const productId = parseInt(req.params.id);
      const { name, category, price, stock, description } = req.body;
      const productIndex = products.findIndex(p => p.id === productId);

      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      const updatedProduct = new Product(productId, name, category, price, stock, description, products[productIndex].createdAt);

      const errors = updatedProduct.validate();
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors
        });
      }

      // Verificar si el nombre ya existe (excluyendo el actual)
      const existingProduct = products.find(p => p.name === name && p.id !== productId);
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: 'El nombre del producto ya está registrado por otro producto'
        });
      }

      products[productIndex] = updatedProduct;

      res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: updatedProduct.toJSON()
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
  static deleteProduct(req, res) {
    try {
      const productId = parseInt(req.params.id);
      const productIndex = products.findIndex(p => p.id === productId);

      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      const deletedProduct = products.splice(productIndex, 1)[0];

      res.status(200).json({
        success: true,
        message: 'Producto eliminado exitosamente',
        data: deletedProduct.toJSON()
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

module.exports = ProductController;
