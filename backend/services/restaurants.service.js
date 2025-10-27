import Order from "../models/Order.js";
import { Op, Sequelize } from "sequelize";
import OrderItem from "../models/OrderItem.js";
import Item from "../models/Item.js";

const restaurantsService = {
  async getPendingOrders(req) {
    const { user } = req;
    const restaurantID = user.restaurantID;

    const pendingOrders = await Order.findAll({
      where: { restaurant_id: restaurantID, is_completed: false },
    });

    return { code: 200, data: pendingOrders, ok: true };
  },

  async getMonthlyOrders(req) {
    const { restaurantId } = req.params;

    const now = new Date();

    const startOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

    const endOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()}`;


    const totalOrders = await Order.count({
      where: {
        restaurant_id: restaurantId,
        [Op.and]: [
          Sequelize.literal(`DATE(order_date) >= '${startOfMonth}'`),
          Sequelize.literal(`DATE(order_date) <= '${endOfMonth}'`)
        ]
      }
    });

    return totalOrders
  },

  async getWeeklyOrders(req) {
    const { restaurantId } = req.params;

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 8);

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_date: {
          [Op.between]: [weekAgo, today]
        }
      },
      include: [
        {
          model: OrderItem,
          attributes: ["quantity", "subtotal"],
          include: [{ model: Item, attributes: ["name", "price"] }],
        },
      ],
    });

    return orders
  },

  async getPopularDishes(req) {

    const { restaurantId } = req.params

    const dishes = await OrderItem.findAll({
      attributes: [
        "item_id",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "quantity"],
      ],
      include: [
        {
          model: Item,
          attributes: ["name"],
          where: { restaurant_id: restaurantId },
        },
      ],
      group: ["item_id", "Item.id", "Item.name"],
      order: [[Sequelize.fn("SUM", Sequelize.col("quantity")), "DESC"]],
      limit: 10,
    });

    return dishes.map(dish => ({
      name: dish.Item.name,
      quantity: dish.dataValues.quantity,
    }));
  },

};



export default restaurantsService;
