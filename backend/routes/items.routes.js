import { Router } from "express";
import itemsController from "../controllers/items.controller.js";

const itemsRouter = Router();

itemsRouter.get("/items/:restaurantID", itemsController.getItemsByRestaurant);

itemsRouter.post("/items", itemsController.addNewItem);

export default itemsRouter;
