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
  addTableToRestaurant(req, res) {},
  deleteTableFromRestaurant(req, res) {},
};

export default ordersController;
