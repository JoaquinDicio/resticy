import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders", ordersController.addNewOrder);

ordersRouter.get("/orders/:orderID", ordersController.getOrderById);

ordersRouter.get("/restaurant/:restaurantId/weekly", ordersController.getWeeklyOrders);

ordersRouter.get("/restaurant/:restaurantId/monthly", ordersController.getMonthlyOrders);

export default ordersRouter;
