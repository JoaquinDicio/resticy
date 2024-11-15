import Order from "./Order.js";
import Item from "./Item.js";
import OrderItem from "./OrderItem.js";
import Role from "./Role.js";
import User from "./User.js";
import Restaurant from "./Restaurant.js";
import Table from "./Table.js";

const initModels = () => {
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
};

const initializeModels = () => {
  initModels();
  return { Order, Item, OrderItem, Role, User, Restaurant, Table };
};

export default initializeModels;
