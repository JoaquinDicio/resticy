import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

export default function ItemsSelector({ setOrderData, orderData }) {
  const { axiosGet, isLoading } = useAxios();
  const [items, setItems] = useState(null);
  const { restaurantID } = useParams();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axiosGet(
          `https://resticy-production.up.railway.app/items/${restaurantID}`
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
      const oldItem = { ...orderData.items[itemId] }; // este es el item que ya estaba en la orden

      setOrderData((prev) => ({
        ...prev,
        total_amount: prev.total_amount + parseInt(oldItem.price),
        items: {
          ...prev.items,
          [itemId]: {
            ...oldItem,
            quantity: oldItem.quantity + 1, //le suma uno a la cantidad vieja
            subtotal: (oldItem.quantity + 1) * oldItem.price,
          },
        },
      }));
      return;
    }

    // si no esta en el carrito
    setOrderData((prev) => ({
      ...prev,
      total_amount: prev.total_amount + parseInt(newItem.price),
      items: {
        ...prev.items,
        [itemId]: {
          item_id: itemId,
          quantity: 1,
          price: newItem.price,
          subtotal: newItem.price,
        },
      },
    }));
  }

  const removeItem = (itemId) => {
    const oldItem = orderData.items[itemId]; //item que ya estaba en el array

    if (oldItem?.quantity == 0 || !oldItem) return;

    setOrderData((prev) => ({
      ...prev,
      total_amount: prev.total_amount - parseInt(oldItem.price),
      items: {
        ...prev.items,
        [itemId]: {
          ...oldItem,
          quantity: oldItem.quantity - 1,
          subtotal: (oldItem.quantity - 1) * oldItem.price,
        },
      },
    }));
  };

  return (
    <ul className="w-full md:overflow-y-scroll md:max-h-[400px]">
      {isLoading && (
        <p className="text-center text-gray-500">Cargando productos...</p>
      )}
      {items?.map((item) => (
        <li
          key={item.id}
          className="flex p-4 border-b border-gray-200 flex-col md:flex-row justify-between"
        >
          <div className="flex items-center gap-5">
            <div className="w-[40%]">
              <img
                src={`https://resticy-production.up.railway.app/uploads/${item.img}`}
                alt={item.name}
                className="w-[200px] object-cover aspect-square rounded-[200px]"
              />
            </div>
            <div>
              <p className="text-md font-semibold break-words max-w-[10rem] md:max-w-[100%]">
                {item.name}
              </p>
              <p className="text-gray-700">${item.price}</p>
            </div>
          </div>
          <div className="flex justify-center mt-5 md:mt-0 md:justify-end items-center w-100 gap-4 md:w-[60%]">
            <button
              onClick={() => removeItem(item.id)}
              className=" text-md w-[90%] h-[40px] bg-red-500 text-white rounded-lg"
            >
              Eliminar
            </button>
            <p className="text-xl font-[sans-serif] font-bold">
              {orderData.items[item.id]?.quantity || 0}
            </p>
            <button
              onClick={() => addItem(item.id)}
              className="text-md w-[90%] h-[40px] bg-green-500 text-white rounded-lg"
            >
              Agregar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
