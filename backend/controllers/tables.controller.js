import tablesService from "../services/tables.service.js";

const ordersController = {
  async getTablesByRestaurant(req, res) {
    try {
      const response = await tablesService.getTablesByRestaurant(req);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).send("Error obteniendo las mesas:", e);
    }
  },

  async createTable(req, res) {
    try {
      const response = await tablesService.createTable(req);
      res.status(response.code).json(response);
    } catch (e) {
      res.status(500).send("Error creando la mesa:", e);
    }
  },

  async deleteTableById(req, res) {
    try {
      const response = await tablesService.deleteTableById(req);
      res.status(response.code).json(response);
    } catch (e) {
      res.status(500).send("Error eliminando la mesa:", e);
    }
  },
};

export default ordersController;
