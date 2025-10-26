import { MercadoPagoConfig, Preference } from "mercadopago";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import HttpError from "../errors/httpError.js";

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
      return new HttpError("No se puede crear una orden sin items", 400)
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
      },
    });

    if (!result.init_point) {
      return new HttpError("Algo salio mal creando el link de pago", 500)
    }

    return { ok: true, data: result };
  },

  async markAsPayed(orderId) {
    const PAYMENTS_METHODS = ["Efectivo", "Debito / Credito", "MercadoPago"];

    // buscar el registro en la base de datos y actualizar el pago
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

    return { data, ok: true };
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
          [Op.lte]: endOfDay,
        },
      };

      // Obtener el total de pagos de hoy
      const dailyTotal = await Payment.sum("amount", { where: whereCondition });
      return {
        dailyTotal: dailyTotal ?? 0,
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

      const paymentsFormatted = payments.map((payment) => ({
        ...payment.dataValues,
        amount: parseFloat(payment.dataValues.amount),
      }));

      const totalAmount = paymentsFormatted.reduce((acc, payment) => acc + payment.amount, 0)

      return { payments: paymentsFormatted, totalAmount }

    } catch (error) {

      console.error("Error obteniendo los pagos de los últimos 7 días:", error);

      throw error;

    }
  },

  async getCurrentMonthPayments(restaurantId) {
    try {
      const today = new Date();

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const endOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const payments = await Payment.findAll({
        where: {
          restaurant_id: restaurantId,
          createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
        },
        attributes: ["amount", "createdAt"],
        order: [["createdAt", "ASC"]],
      });

      const paymentsFormatted = payments.map((payment) => ({
        ...payment.dataValues,
        amount: parseFloat(payment.dataValues.amount),
      }));

      const totalAmount = paymentsFormatted.reduce((acc, payment) => acc + payment.amount, 0)

      return { payments: paymentsFormatted, totalAmount };
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
          [
            Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM"),
            "month",
          ],
        ],
        group: [Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM")],
        order: [
          [
            Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM"),
            "ASC",
          ],
        ],
      });

      const MONTHS = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      const rawData = payments.map((p) => ({
        month: p.get("month"), // e.g., "2025-04"
        total: parseInt(p.get("total"), 10) || 0,
      }));

      const totalsByMonth = {};

      rawData.forEach(({ month, total }) => {
        const monthIndex = parseInt(month.split("-")[1], 10) - 1;
        totalsByMonth[monthIndex] = total;
      });

      const formatted = MONTHS.map((name, index) => ({
        month: name,
        total: totalsByMonth[index] || 0,
      }));

      return formatted;
    } catch (error) {
      console.error("Error obteniendo el resumen de pagos mensuales:", error);
      throw error;
    }
  }
};
export default paymentService;
