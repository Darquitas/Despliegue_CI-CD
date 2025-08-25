const express = require("express");
const userRouter = require("./routes/userRoutes");
const sequelize = require("./config/db"); // conexión a PostgreSQL

const app = express();
app.use(express.json());

// Ruta raíz para verificar que la API está viva
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Rutas de usuarios
// Ahora el prefijo es "/api/users" y dentro del router usamos "/"
app.use("/api/users", userRouter);

// Probar conexión y sincronizar DB
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado a PostgreSQL");
    return sequelize.sync({ alter: true }); // crea/actualiza tablas
  })
  .then(() => {
    console.log("✅ Tablas sincronizadas");
    app.listen(3000, () => {
      console.log("🚀 Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base:", err);
  });
