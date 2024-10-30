// models/index.js maneja todas las relaciones e inicia los modelos
import sequelize from "../database.js";
import Order from "./Order.js";
import Item from "./Item.js";
import OrderItem from "./OrderItem.js";

// se establecen todas las relaciones
// el orden de esto es importante, y puede generar errores
const initModels = () => {
  Order.hasMany(OrderItem, { foreignKey: "order_id" });

  Item.hasMany(OrderItem, { foreignKey: "item_id" });

  OrderItem.belongsTo(Item, { foreignKey: "item_id" });

  OrderItem.belongsTo(Order, { foreignKey: "order_id" });
};

const initializeModels = () => {
  initModels();
  return { Order, Item, OrderItem };
};

export default initializeModels;
