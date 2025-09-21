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
      console.log("Error cargando la orden:", e);
    }
  },

  async updateOrder(req, res) {
    try {
      const response = await ordersService.updateOrder(req);
      res.status(response.code).json(response);
      io.emit("order-update", response.data); // emite el evento y envia la nueva data de la orden
    } catch (e) {
      console.log("Error intentando actualizar la orden", e);
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

};

export default ordersController;
