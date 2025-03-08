import axios from "axios";

export default async function markAsCompleted(orderId) {
  // actualizar el registro en el backend
  await axios.put(
    "https://resticy-production.up.railway.app/orders/" + orderId,
    {
      newData: { is_completed: true },
    }
  );

  return;
}
