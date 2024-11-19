import { Router } from "express";
import restaurantsController from "../controllers/restaurants.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const restaurantsRouter = Router();

restaurantsRouter.get(
  "/restaurants/orders",
  authMiddleware,
  restaurantsController.getPendingOrders
);

export default restaurantsRouter;
