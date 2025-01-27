import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payment/create-preference",
  paymentController.createPreference
);

paymentRouter.post("/payment/verify/", paymentController.checkPayment);

paymentRouter.get("/payment/success", paymentController.success);
export default paymentRouter;
