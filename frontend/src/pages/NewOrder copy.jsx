import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemsSelector from "../components/ItemsSelector";
import useAxios from "../hooks/useAxios";

export default function NewOrder() {
  const [success, setSucces] = useState(false);
  const { axiosPost, isPosting } = useAxios();
  const { restaurantID, tableID } = useParams();

  const [orderData, setOrderData] = useState({
    order_date: new Date().toISOString().split("T")[0],
    items: {},
    notes: "",
    table_id: parseInt(tableID),
  });

  function formatOrderData() {
    const orderItems = [];
    //convierte los items a [] y agrega 'subtotal'
    for (const key in orderData.items) {
      const currentItem = orderData.items[key];
      orderItems.push({
        ...currentItem,
        subtotal: currentItem.price * currentItem.quantity,
      });
    }

    //calcula el total
    const totalAmount = orderItems.reduce(
      (total, item) => total + parseFloat(item.subtotal),
      0
    );

    //construye la orden
    const order = {
      ...orderData,
      restaurant_id: restaurantID,
      total_amount: totalAmount.toFixed(2),
      items: orderItems,
    };

    return order;
  }

  // TODO -> ESTO SE TIENE QUE HACER DESPUES DE SELECCIONAR EL METODO DE PAGO
  async function placeOrder(e) {
    e.preventDefault();

    const order = formatOrderData();

    order.items = order.items.filter((item) => item.quantity > 0); // elimina los vacios

    if (order.table_id == 0) return;

    // si hay items postea la orden
    if (order.items.length > 0) {
      await axiosPost("http://localhost:8080/orders", { order });
      setSucces(true);
    }
  }

  return (
    <>
      <div className="flex items-center min-h-screen p-10 justify-center bg-[var(--wine-color)]">
        <form
          onSubmit={placeOrder}
          className="w-full md:w-1/2 lg:w-[900px] p-10 bg-white lg:rounded-lg shadow-lg bg-[var(--marfil-color)]"
        >
          <h1 className="text-2xl font-bold mb-8">Haz tu pedido</h1>
          <div className="mb-4 overflow-y-auto">
            <ItemsSelector setOrderData={setOrderData} orderData={orderData} />
          </div>
          <div className="w-full flex py-5 flex-col">
            <label htmlFor="notes">Notas del pedido:</label>
            <textarea
              value={orderData.notes}
              onChange={(e) =>
                setOrderData((prev) => ({ ...prev, notes: e.target.value }))
              }
              name="notes"
              id="notes"
              className="p-2 bg-slate-100 my-2"
              placeholder="Ej. Hamburguesa sin ketchup"
            ></textarea>
          </div>
          <div className="flex gap-3">
            <input
              type="submit"
              className="mt-4 cursor-pointer bg-[var(--yellow-color)] text-white px-6 py-2 rounded-lg disabled:bg-slate-200 transition duration-200"
              disabled={isPosting}
              value={isPosting ? "Enviando..." : "Efectivo"}
            />
            <input
              type="submit"
              className="mt-4 cursor-pointer bg-[var(--yellow-color)] text-white px-6 py-2 rounded-lg disabled:bg-slate-200 transition duration-200"
              disabled={isPosting}
              value={isPosting ? "Enviando..." : "Pagar con MercadoPago"}
            />
          </div>
        </form>
        {success && (
          <div className="bg-green-500 text-white w-full p-2 fixed bottom-0">
            <p className="text-xl text-center">Pedido enviado con éxito</p>
          </div>
        )}
      </div>
    </>
  );
}
