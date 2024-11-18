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

itemsRouter.put("/items", itemsController.updateItem);
itemsRouter.delete("/itemDelete/:id", itemsController.deleteItem);
export default itemsRouter;
