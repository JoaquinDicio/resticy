import { Router } from "express";
import tablesController from "../controllers/tables.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const tablesRouter = Router();

tablesRouter.get(
  "/tables/:restaurantID?",
  authMiddleware,
  tablesController.getTablesByRestaurant
);

tablesRouter.delete(
  "/tables/:tableID",
  authMiddleware,
  tablesController.deleteTableById
);

tablesRouter.post("/tables", authMiddleware, tablesController.createTable);

export default tablesRouter;
