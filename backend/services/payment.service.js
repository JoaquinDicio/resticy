import { MercadoPagoConfig, Preference } from "mercadopago";

// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

//creamos la preferencia osea la orden de venta
const preference = new Preference(client);

const paymentService = {
  async createPreference(req) {
    const { items } = req.body;

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
        back_urls: {
          success: "http://localhost:8080/payment/success",
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

  async checkPayment(preferenceID) {
    try {
      // Realizar la solicitud a la API de Mercado Pago
      const response = await fetch(
        `https://api.mercadopago.com/merchant_orders/search?preference_id=${preferenceID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      return { data: response, ok: true, status: 200 };
    } catch (e) {
      console.log("Error buscando informacion sobre el pago", e);
    }
  },
};

export default paymentService;
