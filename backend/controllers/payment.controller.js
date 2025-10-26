import { io } from "../server.js";
import paymentService from "../services/payment.service.js";

const paymentController = {

  async createPreference(req, res) {
    try {
      const response = await paymentService.createPreference(req);
      res.status(200).json(response);
    } catch (e) {
      console.log("Algo salio mal generando el link de pago", e);
    }
  },

  async markAsPayed(req, res) {
    try {
      const response = await paymentService.markAsPayed(req.params.orderId);

      // emito el evento con los datos de la orden que ha sido pagada
      io.emit("order-payment", response.data);

      res.status(200).json(response);
    } catch (e) {
      console.log("Error actualizando el pago en la orden", e);
    }
  },

  async getPaymentsSummary(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getPaymentsToday(restaurantId);
      res.status(200).json(response);
    } catch (e) {
      console.log("Error obteniendo el resumen de pagos", e);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  async getWeeklyPayments(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getWeeklyPayments(restaurantId);
      res.status(200).json(response);
    } catch (e) {
      console.log("Error obteniendo los pagos de la semana", e);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  async getCurrentMonthPayments(req, res) {
    try {
      const { restaurantId } = req.params;
      const response = await paymentService.getCurrentMonthPayments(restaurantId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo los pagos del mes" });
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
