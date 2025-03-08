import axios from "axios";

export default async function updatePayment(orderId) {
  try {
    await axios.post(
      "https://resticy-production.up.railway.app/payment/new/" + orderId
    );
  } catch (e) {
    console.log("ERROR marcando la orden como pagada:", e);
    return { error: "Error intentando actualizar la orden" };
  }
}
