import restaurantsService from "../services/restaurants.service.js";

const restaurantsController = {
  async getPendingOrders(req, res) {
    try {
      const response = await restaurantsService.getPendingOrders(req);
      res.status(response.code).json(response);
    } catch (e) {
      console.log("ERROR obteniendo las ordenes: ", e);
    }
  },
};

export default restaurantsController;
