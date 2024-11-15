export default function ItemsSelector({
  items,
  isLoading,
  setOrderData,
  orderData,
}) {
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
            <input
              type="button"
              value={"Agregar"}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => addItem(item.id)}
            />
            {orderData.items[item.id]?.quantity > 0 && (
              <input
                type="button"
                value={"Eliminar"}
                className="cursor-pointer ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => removeItem(item.id)}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
