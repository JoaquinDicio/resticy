import axios from "axios";

export default async function markAsCompleted(orderId) {
  const baseUrl = import.meta.env.VITE_API_URL;

  // actualizar el registro en el backend
  await axios.put(`${baseUrl}/orders/${orderId}`, {
    newData: { is_completed: true },
  });

  return;
}
