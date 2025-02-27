import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders", ordersController.addNewOrder);

ordersRouter.put("/orders/:orderID", ordersController.updateOrder);

ordersRouter.get("/orders/:orderID", ordersController.getOrderById);

ordersRouter.get("/restaurant/:restaurantId/weekly", ordersController.getWeeklyOrders);

ordersRouter.get("/restaurant/:restaurantId/monthly", ordersController.getMonthlyOrders);

ordersRouter.get("/restaurant/:restaurantId/popular-dishes", ordersController.getPopularDishes);

export default ordersRouter;
