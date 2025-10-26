import itemsService from "../services/items.service.js";

const itemsController = {
  async getItemsByRestaurant(req, res) {
    try {
      const response = await itemsService.getItemsByRestaurant(req);
      res.status(200).json(response);
    } catch (error) {
      res.status(500 || error.code).json({ ...error, message: error.message });
    }
  },

  async addNewItem(req, res) {
    try {
      const response = await itemsService.addNewItem(req);
      res.status(200).json(response);
    } catch (error) {
      res.status(error.code || 500).json({ ...error, message: error.message });
    }
  },

  async deleteItem(req, res) {
    try {
      const response = await itemsService.deleteItem(req);
      res.status(200).json(response);
    } catch (error) {
      res.status(error.code || 500).json({ ...error, message: error.message });
    }
  },

  async updateItem(req, res) {
    try {
      const response = await itemsService.updateItem(req);
      res.status(response.code).json(response);
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  },
};

export default itemsController;
