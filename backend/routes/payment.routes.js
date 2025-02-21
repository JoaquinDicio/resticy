import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payment/create-preference",
  paymentController.createPreference
);

paymentRouter.post("/payment/new/:orderId", paymentController.markAsPayed);

paymentRouter.get("/payment/summary/:restaurantId", paymentController.getPaymentsSummary);

paymentRouter.get("/payments/weekly/:restaurantId", paymentController.getWeeklyPayments); 

paymentRouter.get("/payments/monthly/:restaurantId", paymentController.getCurrentMonthPayments);

export default paymentRouter;
