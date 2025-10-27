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

  async getMonthlyOrders(req, res) {
    try {
      const response = await restaurantsService.getMonthlyOrders(req)
      res.status(200).json(response)
    } catch (e) {
      console.log('Error obtieniendo las ordenes mensuales:', e)
      res.status(500).json({ message: "Error obteniendo las ordenes mensuales:", error: e })
    }
  },

  async getWeeklyOrders(req, res) {
    try {
      const response = await restaurantsService.getWeeklyOrders(req)
      res.status(200).json(response)
    } catch (e) {
      console.log("Error obteniendo las ordenes semanales:", e)
      res.status(500).json({ message: "Error obteniendo las ordenes semanales:", error: e })
    }
  },

  async getPopularDishes(req, res) {
    try {
      const response = await restaurantsService.getPopularDishes(req)
      res.status(200).json(response)
    } catch (e) {
      console.log("Error obteniendo los platos populares:", e)
      res.status(500).json({ message: "Error obteniendo los platos populares:", error: e })
    }
  }
};


export default restaurantsController;
