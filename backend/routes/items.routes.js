import { Router } from "express";
import itemsController from "../controllers/items.controller.js";
import upload from "../middlewares/multerConfig.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const itemsRouter = Router();

itemsRouter.get("/items/:restaurantID", itemsController.getItemsByRestaurant);

itemsRouter.post(
  "/items",
  authMiddleware,
  upload.single("img"),
  itemsController.addNewItem
);

export default itemsRouter;
