import ordersService from "../services/orders.service.js";
import { io } from "../server.js";

const ordersController = {
  async getOrdersByRestaurant(req, res) {
    try {
      const response = await ordersService.getOrdersByRestaurant(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error enviando las ordenes:", e);
    }
  },

  async addNewOrder(req, res) {
    try {
      const response = await ordersService.addNewOrder(req);
      io.emit("order", response.data);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error obteniendo las ordenes:", e);
    }
  },

  async getOrderById(req, res) {
    try {
      const response = await ordersService.getOrderById(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error obteniendo la orden: ", e);
    }
  },

  async getWeeklyOrders(req, res) {
    try {
      const result = await ordersService.getWeeklyOrders(req);
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({ code: 500, error: error.message, ok: false });
    }
  },

  async getMonthlyOrders(req, res) {
    try {
      const result = await ordersService.getMonthlyOrders(req);
      res.status(result.code).json(result);
    } catch (error) {
      res.status(500).json({ code: 500, error: error.message, ok: false });
    }
  }
 
};

export default ordersController;
