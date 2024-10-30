import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/orders", ordersController.addNewOrder);

//esta ruta hay que sacarla deberia estar en el router de restaurantes
// ordersRouter.get(
//   "/orders/:restaurantID",
//   ordersController.getOrdersByRestaurant
// );

ordersRouter.get("/orders/:orderID", ordersController.getOrderById);

export default ordersRouter;
