import { Router } from "express";
import tablesController from "../controllers/tables.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const tablesRouter = Router();

tablesRouter.get(
  "/tables",
  authMiddleware,
  tablesController.getTablesByRestaurant
);

export default tablesRouter;
