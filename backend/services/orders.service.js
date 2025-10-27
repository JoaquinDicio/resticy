import Order from "../models/Order.js";
import Item from "../models/Item.js";
import OrderItem from "../models/OrderItem.js";

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
