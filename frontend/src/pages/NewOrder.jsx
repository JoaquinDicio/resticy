import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemsSelector from "../components/NewOrder/ItemsSelector";
import useAxios from "../hooks/useAxios";
import createPreference from "../utils/createPreferece";

export default function NewOrder() {
  const navigate = useNavigate();
  const [creatingPreference, setCreatingPreference] = useState(false);
  const { axiosPost, isPosting } = useAxios();
  const { restaurantID, tableID } = useParams();

  const [orderData, setOrderData] = useState({
    order_date: new Date().toISOString().split("T")[0],
    items: {},
    notes: "",
    total_amount: 0,
    restaurant_id: restaurantID,
    table_id: parseInt(tableID),
    payment_method: 1,
  });

  async function placeOrder(e) {
    e.preventDefault();

    const orderItems = Object.values(orderData.items).filter(
      (item) => item.quantity > 0
    );

    // construye la orden
    const order = {
      ...orderData,
      items: orderItems,
    };

    let orderId = null;

    if (order.items.length == 0) return;

    // si es en efectivo se setea la propiedad cash
    if (orderData.payment_method == 1) {
      order["is_cash"] = true;
    }

    // envia la orden y aguarda la respuesta
    const response = await axiosPost(
      "https://resticy-production.up.railway.app/orders",
      {
        order,
      }
    );

    if (response.ok) {
      orderId = response.data.id;
    }

    // en caso de ser necesario crea la preferencia de MP para pagos virtuales
    if (orderData.payment_method != 1) {
      setCreatingPreference(true);

      // se envian los items y la el orderId como external_reference
      const response = await createPreference(orderItems, orderId);

      if (response.ok) {
        window.location.href = response.data.init_point;
      }
    } else {
      // si el pago es en efectivo redirecciona directamente al success
      if (orderItems.length > 0) navigate("/success");
    }
  }

  function handleNoteChange(e) {
    setOrderData((prev) => ({ ...prev, notes: e.target.value }));
  }

  function handleChangePaymentMethod(e) {
    setOrderData((prev) => ({ ...prev, payment_method: e.target.value }));
  }

  return (
    <>
      <div className="flex items-center min-h-screen p-2 md:p-10 justify-center bg-[var(--wine-color)]">
        <div
          data-aos="fade-up"
          className="max-w-[800px] w-full bg-white rounded-lg shadow-md p-5 md:p-10"
        >
          <div className="pb-8 px-4">
            <h1 className="text-2xl font-bold">Haz tu pedido</h1>
            <p className="my-2">Selecciona los productos de tu orden</p>
          </div>
          <ItemsSelector setOrderData={setOrderData} orderData={orderData} />
          <div className="mt-10 flex flex-col gap-3">
            <p className="font-bold text-xl text-right px-6">
              TOTAL:{" "}
              <span className="font-[sans-serif]">
                ${orderData.total_amount.toFixed(2)}{" "}
              </span>
            </p>
            <form onSubmit={(e) => placeOrder(e)} className="w-full">
              <label htmlFor="notes">Notas del pedido</label>
              <textarea
                name="notes"
                id="notes"
                onChange={(e) => handleNoteChange(e)}
                value={orderData.notes}
                className="border-1 p-2 mt-2 rounded-md w-full bg-slate-200 resize-none"
                placeholder="Hamburguesa sin ketchup"
              ></textarea>

              <div className="py-5 flex flex-col gap-2">
                <label htmlFor="payment-method">Método de pago: </label>
                <select
                  onChange={(e) => handleChangePaymentMethod(e)}
                  className="bg-slate-200 p-2 rounded"
                  id="payment-method"
                >
                  <option value="1">Efectivo</option>
                  <option value="2">Débito - Crédito</option>
                  <option value="3">MercadoPago</option>
                </select>
              </div>

              <input
                type="submit"
                disabled={isPosting || creatingPreference}
                value={
                  isPosting || creatingPreference
                    ? "Redireccionando..."
                    : "Finalizar pedido"
                }
                className="disabled:bg-slate-200 w-full mt-2 cursor-pointer disabled:cursor-not-allowed bg-[var(--yellow-color)] text-white px-4 py-5 rounded-lg transition duration-200"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
