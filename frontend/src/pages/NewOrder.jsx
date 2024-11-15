import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

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
  }, []);

  function addItem(itemId) {
    const newItem = items.find((item) => item.id == itemId);

    //si ya esta en el carrito
    if (orderData.items[itemId]) {
      const oldItem = { ...orderData.items[itemId] };

      setOrderData((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...oldItem,
            quantity: oldItem.quantity + 1, //le suma uno a la cantidad vieja
          },
        },
      }));
      return;
    }

    // si no esta en el carrito
    setOrderData((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [itemId]: { item_id: itemId, quantity: 1, price: newItem.price },
      },
    }));
  }

  const removeItem = (itemId) => {
    const oldItem = { ...orderData.items[itemId] }; //item que ya estaba en el array

    setOrderData((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [itemId]: { ...oldItem, quantity: oldItem.quantity - 1 },
      },
    }));
  };

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
      await axiosPost("http://localhost:8080/orders", { order });
    } catch (e) {
      console.log(e);
    } finally {
      setSucces(true);
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Articulos</h1>
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

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b border-gray-200"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-700">${item.price}</p>
                <p className="text-gray-500">
                  Cantidad: {orderData.items[item.id]?.quantity || 0}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => addItem(item.id)}
                >
                  Agregar
                </button>
                {orderData.items[item.id]?.quantity > 0 && (
                  <button
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))
        )}

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
        <button
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg disabled:bg-slate-200 hover:bg-green-600 transition duration-200"
          onClick={placeOrder}
          disabled={isPosting}
        >
          {isPosting ? "Enviando..." : "Hacer pedido"}
        </button>
      </div>
      {success && (
        <div className="bg-green-500 text-white w-full p-2 fixed bottom-0">
          <p className="text-xl text-center">Pedido enviado con exito</p>
        </div>
      )}
    </>
  );
}
