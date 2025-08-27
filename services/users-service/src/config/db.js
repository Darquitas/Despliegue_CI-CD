const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("techstore", "postgres", "santy10tc", {
  host: "localhost",
  dialect: "postgres",
  port: 5432, // el puerto que dejaste en la instalación
});

module.exports = sequelize;
