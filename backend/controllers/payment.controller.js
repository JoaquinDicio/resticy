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

  async checkPayment(req, res) {
    try {
      const response = await paymentService.checkPayment(req.body.preferenceID);
      res.status(response.status).json(response);
    } catch (e) {
      console.log("Error obteniendo datos del pago", e);
    }
  },

  success(req, res) {
    res.status(200).send("Pago recibido con exito");
  },
};

export default paymentController;
