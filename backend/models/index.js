import Order from "./Order.js";
import Item from "./Item.js";
import OrderItem from "./OrderItem.js";
import Role from "./Role.js";
import User from "./User.js";
import Restaurant from "./Restaurant.js";
import Table from "./Table.js";
import Payment from "./Payment.js";
import sequalize from "../database.js";

async function initModels() {
  Order.hasOne(Payment, { foreignKey: "order_id", as: "payment" });
  Payment.belongsTo(Order, { foreignKey: "order_id", as: "order" });

  Restaurant.hasMany(Payment, { foreignKey: "restaurant_id", as: "payments" });
  Payment.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
    as: "restaurant",
  });

  Order.hasMany(OrderItem, { foreignKey: "order_id" });
  Item.hasMany(OrderItem, { foreignKey: "item_id" });
  OrderItem.belongsTo(Item, { foreignKey: "item_id" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id" });

  Role.hasMany(User, { foreignKey: "role_id", as: "users" });
  User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

  Restaurant.hasMany(Table, { foreignKey: "restaurant_id", as: "tables" });
  Table.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
    as: "restaurant",
  });

  Restaurant.hasMany(Order, { foreignKey: "restaurant_id", as: "orders" });
  Order.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
    as: "restaurant",
  });

  await sequalize.sync()
};


export default initModels;
