import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

export default function ItemsSelector({ setOrderData, orderData }) {
  const { axiosGet, isLoading } = useAxios();
  const [items, setItems] = useState(null);
  const { restaurantID } = useParams();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axiosGet(
          `http://localhost:8080/items/${restaurantID}`
        );
        setItems(response.data || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

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

  return (
    <ul>
      {isLoading && (
        <p className="text-center text-gray-500">Cargando productos...</p>
      )}
      {items?.map((item) => (
        <li
          key={item.id}
          className="flex p-4 border-b border-gray-200 flex-col"
        >
          <div className="flex items-center gap-5">
            <img
              src={`http://localhost:8080/uploads/${item.img}`}
              alt={item.name}
              className="w-[100px] h-[100px] rounded-[200px]"
            />
            <div>
              <p className="text-md font-semibold break-words max-w-[10rem] md:max-w-[100%]">
                {item.name}
              </p>
              <p className="text-gray-700">${item.price}</p>
              <p className="text-gray-500">
                Cantidad: {orderData.items[item.id]?.quantity || 0}
              </p>
            </div>
          </div>
          <div className="flex justify-end w-100 gap-4">
            {orderData.items[item.id]?.quantity > 0 && (
              <input
                type="button"
                value={"Eliminar"}
                className="mt-5 cursor-pointer ml-2 bg-red-500 text-white px-4 py-2 rounded-lg transition duration-200"
                onClick={() => removeItem(item.id)}
              />
            )}
            <input
              type="button"
              value={"Agregar"}
              className="mt-5 cursor-pointer bg-[var(--yellow-color)] text-white px-4 py-2 rounded-lg transition duration-200"
              onClick={() => addItem(item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
