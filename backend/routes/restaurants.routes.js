import { Router } from "express";
import restaurantsController from "../controllers/restaurants.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const restaurantsRouter = Router();

restaurantsRouter.get(
  "/restaurants/orders",
  authMiddleware,
  restaurantsController.getPendingOrders
);

restaurantsRouter.get("/restaurant/:restaurantId/weekly", restaurantsController.getWeeklyOrders);

restaurantsRouter.get("/restaurant/:restaurantId/monthly", restaurantsController.getMonthlyOrders);

restaurantsRouter.get("/restaurant/:restaurantId/popular-dishes", restaurantsController.getPopularDishes);


export default restaurantsRouter;
