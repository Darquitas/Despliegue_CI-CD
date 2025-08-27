const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

const app = express();

// Iniciar microservicios en paralelo
spawn('node', ['services/users-service/src/server.js'], { stdio: 'inherit' });
spawn('node', ['services/products-service/src/server.js'], { stdio: 'inherit' });
spawn('node', ['services/order-service/src/server.js'], { stdio: 'inherit' });

// Proxy para Users
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
// Proxy para Products
app.use('/products', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
// Proxy para Orders
app.use('/orders', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));


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

app.listen(3004, () => {
  console.log('API Gateway corriendo en puerto 🚀 http://localhost:3004');
});
