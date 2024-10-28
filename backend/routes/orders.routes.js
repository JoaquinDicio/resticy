import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders", ordersController.addNewOrder);

ordersRouter.get(
  "/orders/:restaurantID",
  ordersController.getOrdersByRestaurant
);

export default ordersRouter;
