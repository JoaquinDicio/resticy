import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

const ordersService = {
  async getOrdersByRestaurant(req) {
    const { restaurantID } = req.params;
    return {
      code: 200,
      message: "Ordenes del restaurante: " + restaurantID,
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
};

export default ordersService;
