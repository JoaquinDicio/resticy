export default function OrderMaker({ items, orderData }) {
  const { axiosGet, axiosPost, isLoading, isPosting } = useAxios();
  const [items, setItems] = useState([]);
  const [orderData, setOrderData] = useState({
    order_date: new Date().toISOString().split("T")[0],
    restaurant_id: 1,
    items: {},
    notes: "",
    table_id: 1,
  });
  return (
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
  );
}
