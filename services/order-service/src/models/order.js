const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSONB, // guardamos [{ productId, quantity }]
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 },
  },
  status: {
    type: DataTypes.ENUM("pendiente", "pagado", "enviado", "cancelado"),
    defaultValue: "pendiente",
  },
}, {
  timestamps: true, // createdAt, updatedAt
});

module.exports = Order;
