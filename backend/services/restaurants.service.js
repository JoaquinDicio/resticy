import Order from "../models/Order.js";

const restaurantsService = {
  async getPendingOrders(req) {
    const { user } = req;
    const restaurantID = user.restaurantID;

    const pendingOrders = await Order.findAll({
      where: { restaurant_id: restaurantID, is_completed: false },
    });

    return { code: 200, data: pendingOrders, ok: true };
  },
};

export default restaurantsService;
