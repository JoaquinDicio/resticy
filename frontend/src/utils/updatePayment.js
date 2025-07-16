import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export default async function updatePayment(orderId) {
  try {
    await axios.post(`${baseUrl}/payment/new/` + orderId);
  } catch (e) {
    console.log("ERROR marcando la orden como pagada:", e);
    return { error: "Error intentando actualizar la orden" };
  }
}
