const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Rutas del microservicio
app.use('/api', orderRoutes);

// Sincronizar DB y levantar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Order Service corriendo en puerto ${PORT}`);
    console.log(`Order Service en: http://localhost:${PORT}`);
  });
});
