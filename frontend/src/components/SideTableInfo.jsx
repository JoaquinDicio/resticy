import { useEffect, useState } from "react";
import axios from "axios";
import OrderItemsList from "./OrderItemsList";
import ClearIcon from "@mui/icons-material/Clear";

export default function SideTableInfo({ selectedTable, orders, setModal }) {
  const [displayOrder, setDisplayOrder] = useState(null);

  useEffect(() => {
    if (selectedTable) {
      //busca en el array de ordenes la orden de la mesa seleccionada
      const order = orders.find((order) => order.table_id == selectedTable.id);

      if (order) {
        //si existe extrae la info de la orden de la bbdd
        findOrder(order.id);
      }
    }
  }, [selectedTable, orders]);

  //extrae los datos de la orden de la base de datos
  async function findOrder(orderId) {
    const orderData = await axios.get(
      `http://localhost:8080/orders/${orderId}`
    );
    setDisplayOrder(orderData.data.data);
  }

  return (
    <div
      className={`max-h-screen z-10 text-white bg-[var(--dark-color)] md:w-[30%] w-full absolute md:relative top-0 h-screen md:min-w-[400px] pt-5 ${
        selectedTable ? "slide-in" : ""
      }`}
    >
      {!selectedTable ? (
        <div className="h-full flex-col w-full flex items-center justify-center">
          <i>No hay ninguna mesa seleccionada</i>
        </div>
      ) : (
        <div className="pt-16 flex flex-col relative h-full justify-between">
          <div className="flex justify-end px-5">
            <ClearIcon
              onClick={() => setModal(false)}
              className="hover:cursor-pointer"
              sx={{ fontSize: 40 }}
            />
          </div>
          <h3 className="text-4xl py-5 text-center">
            Mesa {selectedTable.number}
          </h3>
          {selectedTable.hasOrders ? (
            <OrderItemsList displayOrder={displayOrder} />
          ) : (
            <i className="h-full w-full text-center">
              No existen ordenes pendientes
            </i>
          )}
        </div>
      )}
    </div>
  );
}
