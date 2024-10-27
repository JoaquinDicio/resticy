import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define(
  "Role",
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
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

Role.associate = (models) => {
  Role.hasMany(models.User, {
    foreignKey: "role_id",
    as: "users",
  });
};

export default Role;
