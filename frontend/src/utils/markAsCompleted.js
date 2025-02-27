import axios from "axios";

export default async function markAsCompleted(orderId) {
  // actualizar el registro en el backend
  await axios.put("http://localhost:8080/orders/" + orderId, {
    newData: { is_completed: true },
  });

  return;
}
