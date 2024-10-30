import { useState, useEffect } from "react";
import socket from "../socket.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [tables, setTables] = useState([
    { id: 1, number: 22, hasOrders: false },
    { id: 2, number: 23, hasOrders: false },
    { id: 3, number: 24, hasOrders: false },
    { id: 4, number: 25, hasOrders: false },
  ]);

  useEffect(() => {
    socket.on("order", (newOrder) => handleNewOrder(newOrder));
    return () => {
      // funcion de limpieza del socket => Si no entendes esto lee sobre el ciclo de vida
      // de un componente en react. sino mandame mensaje.
      socket.off("order");
    };
  }, []);

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

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-2xl mb-2">Pedidos pendientes</h1>
      <p>Aca podés ver las ordenes que recibe tu restaurante en tiempo real.</p>
      <ul className="mt-5 flex flex-wrap gap-5">
        {/* TODO => aca deberia ir un componente tableIcon o algo similar */}
        {tables?.map((table) => (
          <li
            key={table.id}
            className="relative shadow-sm bg-white rounded-sm flex flex-col items-center p-4 w-fit"
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
    </section>
  );
}
