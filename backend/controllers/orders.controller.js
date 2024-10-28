import ordersService from "../services/orders.service.js";

const ordersController = {
  async getOrdersByRestaurant(req, res) {
    try {
      const response = await ordersService.getOrdersByRestaurant(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error obteniendo las ordenes:", e);
    }
  },

  async addNewOrder(req, res) {
    try {
      const response = await ordersService.addNewOrder(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error obteniendo las ordenes:", e);
    }
  },
};

export default ordersController;
