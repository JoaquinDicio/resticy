import { MercadoPagoConfig, Preference } from "mercadopago";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";  

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
    const PAYMENTS_METHODS = ["Efectivo", "Debito / Credito",  "MercadoPago"];
    const order = await Order.findByPk(orderId);

    order.is_payed = true;

    const data = await order.save();

    const payment_method =
      PAYMENTS_METHODS[order.dataValues.payment_method - 1];
    //registra el pago en la base de datos
    const newPayment = {
      order_id: order.id,
      amount: order.total_amount,
      restaurant_id: order.restaurant_id,
      payment_method,
    };

    await Payment.create(newPayment);

    return { data, ok: true, status: 200 };
  },

  async getPaymentsToday(restaurantId) {
    try {
      const now = new Date(); 
      const startOfDay = new Date(now); 
      startOfDay.setHours(0, 0, 0, 0); 
  
      const endOfDay = new Date(now); 
      endOfDay.setHours(23, 59, 59, 999); 
  
      const whereCondition = {
        restaurant_id: restaurantId,
        createdAt: { 
          [Op.gte]: startOfDay, 
          [Op.lte]: endOfDay 
        }
      };
  
      // Obtener el total de pagos de hoy
      const dailyTotal = await Payment.sum("amount", { where: whereCondition });
      return {
        dailyTotal: dailyTotal ?? 0
      };
    } catch (error) {
      console.error("Error obteniendo los pagos del día de hoy", error);
      throw error;
    }
  }, 
  
  async getWeeklyPayments(restaurantId) {
    try {
      const today = new Date();
      const lastSevenDays = new Date(today);
      lastSevenDays.setDate(today.getDate() - 7);
      lastSevenDays.setHours(0, 0, 0, 0); 
  
      const payments = await Payment.findAll({
        where: {
          restaurant_id: restaurantId,
          createdAt: {
            [Op.gte]: lastSevenDays, 
            [Op.lte]: today,
          },
        },
        attributes: ["amount", "createdAt"],
        order: [["createdAt", "ASC"]],
      });
  
      return payments.map(payment => ({
        amount: payment.amount,
        date: payment.createdAt,
      }));
    } catch (error) {
      console.error("Error obteniendo los pagos de los últimos 7 días:", error);
      throw error;
    }
  },

  async getCurrentMonthPayments(restaurantId) {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
  
      const payments = await Payment.findAll({
        where: {
          restaurant_id: restaurantId,
          createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
        },
        attributes: ["amount", "createdAt"],
        order: [["createdAt", "ASC"]],
      });
  
      return payments;
    } catch (error) {
      console.error("Error obteniendo los pagos del mes:", error);
      throw error;
    }
  },

  async getMonthlySummary(restaurantId) {
    try {
      const payments = await Payment.findAll({
        where: { restaurant_id: restaurantId },
        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("amount")), "total"],
          [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"), "month"]
        ],
        group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m")],
        order: [[Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"), "ASC"]]
      });
  
      return payments.map(p => ({
        month: p.dataValues.month,
        total: parseInt(p.dataValues.total, 10) || 0 
      }));
    } catch (error) {
      console.error("Error obteniendo el resumen de pagos mensuales:", error);
      throw error;
    }
  }

};

export default paymentService;
