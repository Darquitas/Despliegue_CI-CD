const Product = require("../models/product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;

    // Verificar si ya existe un producto con el mismo nombre
    const existing = await Product.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ success: false, message: "El nombre del producto ya está registrado" });
    }

    const newProduct = await Product.create({ name, category, price, stock, description });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al crear producto", error: error.message });
  }
};

// READ - Todos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products, total: products.length });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener productos", error: error.message });
  }
};

// READ - Por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Producto no encontrado" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener producto", error: error.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Producto no encontrado" });

    await product.update({ name, category, price, stock, description });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar producto", error: error.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Producto no encontrado" });

    await product.destroy();
    res.status(200).json({ success: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar producto", error: error.message });
  }
};
