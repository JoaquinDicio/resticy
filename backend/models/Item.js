import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Item = sequelize.define(
  "Item",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    restaurant_id: DataTypes.BIGINT,
  },
  {
    tableName: "items",
    timestamps: false,
  }
);

Item.associate = (models) => {
  Item.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" });
  Item.belongsToMany(models.Order, {
    through: models.OrderItem,
    foreignKey: "item_id",
  });
};

export default Item;
