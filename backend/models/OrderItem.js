import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false },
    item_id: { type: DataTypes.BIGINT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: "order_items",
    timestamps: false,
  }
);

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
  OrderItem.belongsTo(models.Item, { foreignKey: "item_id" });
};

export default OrderItem;
