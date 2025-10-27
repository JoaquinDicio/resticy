import { io } from "../server.js";
import paymentService from "../services/payment.service.js";

const paymentController = {

  async createPreference(req, res) {
    try {
      const response = await paymentService.createPreference(req);
      res.status(200).json(response);
    } catch (e) {
      res.status(500 || error.code).json({ ...error, message: error.message });
    }
  },

  async markAsPayed(req, res) {
    try {
      const response = await paymentService.markAsPayed(req.params.orderId);
      io.emit("order-payment", response.data);
      res.status(200).json(response);
    } catch (e) {
      res.status(500 || error.code).json({ ...error, message: error.message });
    }
  },

  async getPaymentsSummary(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getPaymentsToday(restaurantId);
      res.status(200).json(response);
    } catch (e) {
      console.log("Error obteniendo el resumen de pagos", e);
      res.status(500 || error.code).json({ ...error, message: error.message });
    }
  },

  async getWeeklyPayments(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getWeeklyPayments(restaurantId);
      res.status(200).json(response);
    } catch (e) {
      console.log("Error obteniendo los pagos de la semana", e);
      res.status(500 || error.code).json({ ...error, message: error.message });
    }
  },

  async getCurrentMonthPayments(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getCurrentMonthPayments(restaurantId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500 || error.code).json({ ...error, message: error.message });
    }
  },

  async getMonthlySummary(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getMonthlySummary(restaurantId);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error obteniendo el resumen de pagos mensuales:", error);
      res.status(500).json({ error: "Error interno del servidor", error });
    }
  },

};

export default paymentController;
