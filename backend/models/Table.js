import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Table = sequelize.define(
  "Table",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
    },
  },
  {
    tableName: "tables",
    timestamps: false,
  }
);

export default Table;
