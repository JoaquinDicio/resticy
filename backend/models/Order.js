import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    restaurant_id: { type: DataTypes.BIGINT, allowNull: false },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    table_id: { type: DataTypes.BIGINT, allowNull: true },
    is_payed: { type: DataTypes.BOOLEAN, defaultValue: false },
    complete: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_canceled: { type: DataTypes.BOOLEAN, defaultValue: false },
    notes: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

export default Order;
