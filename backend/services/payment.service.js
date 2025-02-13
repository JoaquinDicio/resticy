import { MercadoPagoConfig, Preference } from "mercadopago";
import Order from "../models/Order.js";

// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

//creamos la preferencia osea la orden de venta
const preference = new Preference(client);

const paymentService = {
  async createPreference(req) {
    const { items, external_reference } = req.body;

    if (!items || items.length <= 0) {
      return {
        status: 400,
        error: "No se puede crear una orden sin items",
        ok: false,
      };
    }

    //el metodo create retorna una promesa
    const result = await preference.create({
      body: {
        items,
        external_reference,
        back_urls: {
          success: "http://localhost:5173/success",
          failure: "http://localhost:8080/feedback",
          pending: "http://localhost:8080/feedback",
        },
        auto_return: "approved",
      },
    });

    if (!result.init_point) {
      return {
        status: 500,
        error: "Algo salio mal creando el link de pago",
        ok: false,
      };
    }

    return { status: 200, ok: true, data: result };
  },

  async markAsPayed(orderId) {
    // buscar el registro en la base de datos y actualizar el pago
    const order = await Order.findByPk(orderId);

    order.is_payed = true;

    const data = await order.save();

    return { data, ok: true, status: 200 };
  },
};

export default paymentService;
