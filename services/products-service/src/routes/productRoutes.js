const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Products Service funcionando correctamente",
    timestamp: new Date().toISOString(),
    service: "products-service",
  });
});

module.exports = router;
