import { DataTypes } from "sequelize";
import sequelize from "../database.js";

import Order from "./Order.js";
import Restaurant from "./Restaurant.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  restaurant_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Order.hasOne(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });
Payment.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

export default Payment;
