import { Router } from "express";
import itemsController from "../controllers/items.controller.js";
import upload from "../middlewares/multerConfig.js";

const itemsRouter = Router();

itemsRouter.get("/items/:restaurantID", itemsController.getItemsByRestaurant);

itemsRouter.post("/items", upload.single("img"), itemsController.addNewItem);

export default itemsRouter;
