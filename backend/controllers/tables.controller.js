import tablesService from "../services/tables.service.js";

const ordersController = {
  async getTablesByRestaurant(req, res) {
    try {
      const response = await tablesService.getTablesByRestaurant(req);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ ...error, message: "Error obteniendo las mesas" });
    }
  },

  async createTable(req, res) {
    try {
      const response = await tablesService.createTable(req);
      res.status(200).json(response)
    } catch (error) {
      res.status(error.code || 500).json({ ...error, message: error.message });
    }
  },

  async deleteTableById(req, res) {
    try {
      const response = await tablesService.deleteTableById(req);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: "Error eliminando la mesa" });
    }
  },
};

export default ordersController;
