import Order from "../models/Order.js";
import Item from "../models/Item.js";
import OrderItem from "../models/OrderItem.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

const ordersService = {
  async getOrdersByRestaurant(req) {
    const { restaurantID } = req.params;

    const orders = await Order.findAll({
      where: { restaurant_id: restaurantID },
    });

    return {
      code: 200,
      data: [...orders],
      ok: true,
    };
  },

  async addNewOrder(req) {
    const { order } = req.body;
    const { dataValues } = await Order.create({ ...order }); // insert en la tabla orders

    order.items?.forEach(async (orderItem) => {
      const orderId = dataValues.id;
      await OrderItem.create({ ...orderItem, order_id: orderId }); // insert en la tabla order_items
    });

    return { code: 200, data: { id: dataValues.id, ...order }, ok: true };
  },

  async getOrderById(req) {
    const orderId = req.params.orderID;

    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          attributes: ["quantity", "subtotal"],
          include: [{ model: Item, attributes: ["name", "price"] }],
        },
      ],
    });

    return { code: 200, data: order, ok: true };
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
  
    return {
      code: 200,
      data: [...orders],
      ok: true,
    };
  },

  async getMonthlyOrders(req) {
    const { restaurantId } = req.params;
    
    const now = new Date();
    
    const year = now.getFullYear();
    const month = now.getMonth();
  
    const startOfMonth = new Date(year, month, 1); 
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999); 
  
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_date: {
          [Op.between]: [startOfMonth, endOfMonth]  
        }
      },
      include: [
        {
          model: OrderItem,
          attributes: ["quantity", "subtotal"],
          include: [{ model: Item, attributes: ["name", "price"] }],
        },
      ],
      order: [['order_date', 'ASC']]
    });
  
    return {
      code: 200,
      data: [...orders],
      ok: true,
    };
  },

  async getPopularDishes(restaurantId) {
    try {

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
        group: ["item_id", "Item.name"],
        order: [[Sequelize.fn("SUM", Sequelize.col("quantity")), "DESC"]],
        limit: 10,
      });

      return dishes.map(dish => ({
        name: dish.Item.name,
        quantity: dish.dataValues.quantity,
      }));
    } catch (error) {
      console.error("Error obteniendo los platos más pedidos:", error);
      throw error;
    }},

  async updateOrder(req) {
    const { orderID } = req.params;
    const { newData } = req.body;

    const order = await Order.findByPk(orderID);

    // confirma que exista la orden
    if (!order) {
      return { code: 400, error: "La orden no existe", ok: false };
    }

    await order.update(newData);

    return { code: 200, ok: true, data: order };

  },
};

export default ordersService;
