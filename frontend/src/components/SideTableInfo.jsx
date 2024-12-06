import { useEffect } from "react";
import axios from "axios";
export default function SideTableInfo({
  selectedTable,
  displayOrder,
  setDisplayOrder,
  orders,
  toggleModal,
  visible,
}) {
  useEffect(() => {
    if (selectedTable) {
      //busca en el array de ordenes la orden de la mesa seleccionada
      const order = orders.find((order) => order.table_id == selectedTable.id);

      if (order) {
        setDisplayOrder(null);
        //si existe extrae la info de la orden de la bbdd
        findOrder(order.id);
      }
    }
  }, [selectedTable]);

  //extrae los datos de la orden de la base de datos
  async function findOrder(orderId) {
    const orderData = await axios.get(
      `http://localhost:8080/orders/${orderId}`
    );
    setDisplayOrder(orderData.data.data);
  }

  return (
    <div className="max-h-screen z-10 text-white bg-[var(--dark-color)] md:w-[30%] w-full absolute top-0 h-screen md:min-w-[400px] pt-5">
      {!selectedTable ? (
        <div className="h-full w-full flex items-center justify-center">
          <i>No hay ninguna mesa seleccionada</i>
        </div>
      ) : (
        <div className="pt-16 flex flex-col relative h-full justify-between">
          <div className="flex justify-end px-5">
            <button
              onClick={toggleModal}
              className="bg-red-500 text-white text-sm rounded-sm p-2"
            >
              Cerrar
            </button>
          </div>
          <h3 className="text-4xl py-5 text-center">
            Mesa {selectedTable.number}
          </h3>
          {selectedTable.hasOrders ? (
            <>
              <div className="px-5 pb-5 h-full">
                {displayOrder?.notes && (
                  <i className="text-sm">Nota: {displayOrder.notes}</i>
                )}
                <p className="text-xl w-full text-left pt-6">Orden:</p>
                <ul>
                  {displayOrder?.OrderItems.map((row, i) => (
                    <li key={i} className="py-3">
                      <p className="flex justify-between">
                        {row.Item.name}{" "}
                        <span className="font-bold">$ {row.subtotal}</span>
                      </p>
                      <i className="text-sm text-[var(--yellow-color)]">
                        Cantidad: {row.quantity}
                      </i>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[var(--yellow-color)] items-center flex justify-between p-5 font-medium">
                <p>Finalizar orden</p>{" "}
                <p className="font-medium text-2xl">
                  $ {displayOrder?.total_amount}
                </p>
              </div>
            </>
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
