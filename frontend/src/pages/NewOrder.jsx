import { useState } from "react";
import ItemsSelector from "../components/ItemsSelector";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

export default function NewOrder() {
  const [success, setSucces] = useState(false);
  const { axiosPost, isPosting } = useAxios();
  const { restaurantID } = useParams();

  const [orderData, setOrderData] = useState({
    order_date: new Date().toISOString().split("T")[0],
    items: {},
    notes: "",
    table_id: 1,
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

  async function placeOrder(e) {
    e.preventDefault();

    const order = formatOrderData();
    if (order.items.length > 0) {
      await axiosPost("http://localhost:8080/orders", { order });
      setSucces(true);
    }
  }

  return (
    <>
      <div className=" items-center flex items-center justify-center bg-[var(--wine-color)]">
        <form
          onSubmit={placeOrder}
          className="w-full md:w-1/2 lg:w-1/2 p-6 bg-white lg:rounded-lg shadow-lg bg-[var(--marfil-color)]"
        >
          <h1 className="text-2xl font-bold mb-4">Haz tu pedido</h1>
          <div className="mb-4">
            <label
              htmlFor="table-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selecciona una mesa:
            </label>
            <select
              id="table-select"
              value={orderData.table_id}
              onChange={(e) =>
                setOrderData((prev) => ({
                  ...prev,
                  table_id: parseInt(e.target.value),
                }))
              }
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              {[1, 2, 3].map((table) => (
                <option key={table} value={table}>
                  Mesa {table}
                </option>
              ))}
            </select>
          </div>
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
          <input
            type="submit"
            className="mt-4 cursor-pointer bg-[var(--yellow-color)] text-white px-6 py-2 rounded-lg disabled:bg-slate-200 transition duration-200"
            disabled={isPosting}
            value={isPosting ? "Enviando..." : "Hacer pedido"}
          />
        </form>
        {success && (
          <div className="bg-green-500 text-white w-full p-2 fixed bottom-0">
            <p className="text-xl text-center">Pedido enviado con exito</p>
          </div>
        )}
      </div>
    </>
  );
}
