import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Item = sequelize.define(
  "Item",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    img: DataTypes.STRING,
    restaurant_id: DataTypes.BIGINT,
  },
  {
    tableName: "items",
    timestamps: false,
  }
);

export default Item;
