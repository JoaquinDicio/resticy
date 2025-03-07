import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
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
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: "role_id",
    as: "role",
  });
};

export default User;
