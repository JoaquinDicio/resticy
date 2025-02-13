import { io } from "../server.js";
import paymentService from "../services/payment.service.js";

const paymentController = {
  async createPreference(req, res) {
    try {
      const response = await paymentService.createPreference(req);
      res.status(response.status).json(response);
    } catch (e) {
      console.log("Algo salio mal generando el link de pago", e);
    }
  },

  async markAsPayed(req, res) {
    try {
      const response = await paymentService.markAsPayed(req.params.orderId);

      // emito el evento con los datos de la orden que ha sido pagada
      io.emit("order-payment", response.data);

      res.status(response.status).json(response);
    } catch (e) {
      console.log("Error actualizando el pago en la orden", e);
    }
  },
};

export default paymentController;
