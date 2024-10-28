import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    restaurant_id: { type: DataTypes.BIGINT, allowNull: false },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    table_id: { type: DataTypes.BIGINT, allowNull: true }, // si aplicas mesas
    complete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

Order.associate = (models) => {
  Order.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
  Order.belongsTo(models.Table, { foreignKey: "table_id" });
  Order.belongsToMany(models.Item, {
    through: models.OrderItem,
    foreignKey: "order_id",
  });
};

export default Order;
