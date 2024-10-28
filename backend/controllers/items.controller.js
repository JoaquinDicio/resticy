import itemsService from "../services/items.service.js";

const itemsController = {
  async getItemsByRestaurant(req, res) {
    try {
      const response = await itemsService.getItemsByRestaurant(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error obteniendo los productos:", e);
    }
  },

  async addNewItem(req, res) {
    try {
      const response = await itemsService.addNewItem(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("Error agregando el producto:", e);
    }
  },
};

export default itemsController;
