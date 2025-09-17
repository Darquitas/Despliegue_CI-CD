const express = require('express');
const app = express();
app.use(express.json());

// Integrar rutas de microservicios directamente
const userRoutes = require('./services/users-service/src/routes/userRoutes');
const productRoutes = require('./services/products-service/src/routes/productRoutes');
const orderRoutes = require('./services/order-service/src/routes/orderRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido al API TechStore',
    rutas: {
      users: '/users',
      products: '/products',
      orders: '/orders'
    }
  });
});

const PORT = 3004;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 API Gateway corriendo en http://${HOST}:${PORT}`);
});
