import { useState, useEffect } from "react";
import socket from "../socket.js";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [displayOrder, setDisplayOrder] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  // TODO =>  esto deberia venir de la base de datos
  // se deberia hacer un GET cuando se monta el componentn con useEffect
  const [tables, setTables] = useState([
    { id: 1, number: 1, hasOrders: false },
    { id: 2, number: 2, hasOrders: false },
    { id: 3, number: 3, hasOrders: false },
    { id: 4, number: 4, hasOrders: false },
    { id: 5, number: 5, hasOrders: false },
    { id: 6, number: 6, hasOrders: false },
    { id: 7, number: 7, hasOrders: false },
    { id: 8, number: 8, hasOrders: false },
  ]);

  useEffect(() => {
    socket.on("order", (newOrder) => handleNewOrder(newOrder));
    return () => {
      // se limpia el socket: si no lo entendes lee sobre el lifecycle de un componente, sino preguntame
      socket.off("order");
    };
  }, []);

  useEffect(() => {
    if (selectedTable) {
      //busca en el array de ordenes
      const order = orders.find((order) => order.table_id == selectedTable.id);

      if (order) {
        setDisplayOrder(null);
        //si existe extrae la info de la orden de la bbdd
        findOrder(order.id, (orderData) => {
          setDisplayOrder(orderData.data.data);
        });
      }
    }
  }, [selectedTable]);

  async function findOrder(orderId, callback) {
    const orderData = await axios.get(
      `http://localhost:8080/orders/${orderId}`
    );
    callback(orderData);
  }

  function handleNewOrder(newOrder) {
    setOrders((prev) => [...prev, newOrder]);
    const tableId = newOrder.table_id;
    // actualiza el estado para mostrar la campanita en la mesa correspondiente
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, hasOrders: true } : table
      )
    );
  }

  function handleSelectTable(table) {
    setSelectedTable(table);
  }

  return (
    <section className="bg-gray-100 min-h-screen flex">
      <div className="h-screen text-white bg-[var(--dark-color)] w-[30%] min-w-[400px]">
        {!selectedTable ? (
          <div className="h-full w-full flex items-center justify-center">
            <i>No hay ninguna mesa seleccionada</i>
          </div>
        ) : (
          <div className="pt-10 h-full flex flex-col justify-between">
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
      <div className="p-10">
        <h1 className="font-bold text-2xl mb-2">Mesas</h1>
        <p>
          Aqui podrás ver las ordenes que recibe tu restaurante en tiempo real.
        </p>
        <ul className="mt-5 flex flex-wrap flex-wrap gap-5">
          {/* TODO => aca deberia ir un componente tableIcon o algo similar */}
          {tables?.map((table) => (
            <li
              key={table.id}
              onClick={() => handleSelectTable(table)}
              className="hover:shadow-lg duration-200 min-w-[80px] cursor-pointer relative shadow-sm bg-white rounded-sm flex flex-col items-center p-4 w-fit"
            >
              <p className="font-medium text-4xl">{table.number}</p>
              {table.hasOrders && (
                <span className="absolute right-[-15px] top-[-15px] mt-2 text-center rounded-full font-medium text-sm py-1 px-2 bg-green-500 text-white">
                  🔔
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
