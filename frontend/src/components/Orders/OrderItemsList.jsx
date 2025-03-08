import { useState } from "react";
import markAsCompleted from "../../utils/markAsCompleted";
import updatePayment from "../../utils/updatePayment";
import { CircularProgress } from "@mui/material";

export default function OrderItemsList({ displayOrder }) {
  const [loading, setLoading] = useState(false);

  async function updateOrderStatus() {
    // si la orden es cash primero se marca como pagada
    if (displayOrder.is_cash && !displayOrder.is_payed) {
      setLoading(true);
      updatePayment(displayOrder.id).then(() => setLoading(false));
      return;
    }

    //si la orden ya esta paga, directamente se completa
    if (displayOrder.is_payed) {
      setLoading(true);
      markAsCompleted(displayOrder.id).then(() => setLoading(false));
    }
  }

  //se encarga de decidir que texto mostrar segun el estado del pago
  function getStatusText() {
    const { is_payed, is_cash } = displayOrder;

    if (is_payed) return "Marcar como entregada";

    if (is_cash && !is_payed) return "He recibido el pago";

    if (!is_payed && !is_cash) return "Pago en proceso...";
  }

  //se encarga de decidir que background mostrar segun el estado del pago
  function getClassByPaymentStatus() {
    const { is_payed, is_cash } = displayOrder;

    if (is_payed) return "bg-green-500";

    if (is_cash && !is_payed) return "bg-[var(--yellow-color)]";

    if (!is_payed && !is_cash) return "bg-gray-500";
  }

  return (
    <>
      <div className="px-5 pb-5 h-full">
        {displayOrder?.notes && (
          <i className="text-sm">Nota: {displayOrder.notes}</i>
        )}
        <p className="text-xl w-full text-left pt-6">Orden:</p>
        <ul>
          {displayOrder?.OrderItems.map((row, i) => (
            <li key={i} className="py-3">
              <p className="flex justify-between">
                {row.Item.name}{" "}
                <span className="font-bold">$ {row.subtotal}</span>
              </p>
              <i className="text-sm text-[var(--yellow-color)]">
                Cantidad: {row.quantity}
              </i>
            </li>
          ))}
        </ul>
      </div>
      <section className={`${getClassByPaymentStatus()}`}>
        <button
          onClick={updateOrderStatus}
          className="flex justify-between items-center w-full p-5 font-medium cursor-pointer"
          aria-label="Ver detalles del pedido"
        >
          {!loading ? (
            <>
              <span className="status-text">{getStatusText()}</span>
              <span className="font-medium text-2xl">
                ${displayOrder.total_amount}
              </span>
            </>
          ) : (
            <>
              <span className="status-text">Actualizando</span>
              <CircularProgress color="white" size={25} />
            </>
          )}
        </button>
      </section>
    </>
  );
}
