import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ItemsSelector from "../components/ItemsSelector";

export default function NewOrder() {
  const restaurantId = 1;
  const [items, setItems] = useState([]);
  const [success, setSucces] = useState(false);
  const { axiosGet, axiosPost, isLoading, isPosting } = useAxios();

  const [orderData, setOrderData] = useState({
    order_date: new Date().toISOString().split("T")[0],
    restaurant_id: 1,
    items: {},
    notes: "",
    table_id: 1,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosGet(
          `http://localhost:8080/items/${restaurantId}`
        );
        setItems(response.data || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [restaurantId]);

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
      total_amount: totalAmount.toFixed(2),
      items: orderItems,
    };

    return order;
  }

  async function placeOrder() {
    try {
      const order = formatOrderData();
      if (order.items.length > 0) {
        await axiosPost("http://localhost:8080/orders", { order });
        setSucces(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function isValidForm(orderData) {
    return orderData && Object.keys(orderData.items).length > 0; //keys() retorna una coleccion de propiedades del objeto
  }

  return (
    <>
      <form
        onSubmit={placeOrder}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg"
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
        <ItemsSelector
          setOrderData={setOrderData}
          orderData={orderData}
          items={items}
          isLoading={isLoading}
        />
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
          className="mt-4 cursor-pointer bg-green-500 text-white px-6 py-2 rounded-lg disabled:bg-slate-200 hover:bg-green-600 transition duration-200"
          disabled={isPosting || !isValidForm()}
          value={isPosting ? "Enviando..." : "Hacer pedido"}
        />
      </form>
      {success && (
        <div className="bg-green-500 text-white w-full p-2 fixed bottom-0">
          <p className="text-xl text-center">Pedido enviado con exito</p>
        </div>
      )}
    </>
  );
}
