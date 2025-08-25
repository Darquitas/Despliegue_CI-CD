const express = require("express");
const productRoutes = require("./routes/productRoutes");
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Middleware básico de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use("/api", productRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// DB Sync y start
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado a PostgreSQL (Products)");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Tablas de productos sincronizadas");
    app.listen(PORT, () => console.log(`🚀 Products Service en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Error al conectar a la base:", err));

module.exports = app;
