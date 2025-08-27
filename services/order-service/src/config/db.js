const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("techstore", "postgres", "santy10tc", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

module.exports = sequelize;
