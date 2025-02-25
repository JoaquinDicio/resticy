import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders", ordersController.addNewOrder);

ordersRouter.put("/orders/:orderID", ordersController.updateOrder);

ordersRouter.get("/orders/:orderID", ordersController.getOrderById);

export default ordersRouter;
