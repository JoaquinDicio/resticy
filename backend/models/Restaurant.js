import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "restaurants",
    timestamps: false,
  }
);

export default Restaurant;
