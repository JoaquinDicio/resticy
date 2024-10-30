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
    { id: 1, number: 22, hasOrders: false },
    { id: 2, number: 23, hasOrders: false },
    { id: 3, number: 24, hasOrders: false },
    { id: 4, number: 25, hasOrders: false },
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
      const order = orders.find((order) => order.table_id == selectedTable.id);
      if (order) {
        setDisplayOrder(null);
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
    <section className="p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-2xl mb-2">Mesas</h1>
      <p>Aca podés ver las ordenes que recibe tu restaurante en tiempo real.</p>
      <ul className="mt-5 flex flex-wrap gap-5">
        {/* TODO => aca deberia ir un componente tableIcon o algo similar */}
        {tables?.map((table) => (
          <li
            key={table.id}
            onClick={() => handleSelectTable(table)}
            className="hover:shadow-lg duration-200 cursor-pointer relative shadow-sm bg-white rounded-sm flex flex-col items-center p-4 w-fit"
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
      {/* MESA INFO */}
      {selectedTable && (
        <div className="bg-black-500 h-screen fixed top-0 left-0 bg-black w-full bg-opacity-70">
          <div className="bg-white  min-w-[320px] max-w-[25vw] min-h-screen p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-xl font-medium">Pedidos de la mesa</p>
                <span>Mesa {selectedTable.number}</span>
              </div>
              <button
                onClick={() => setSelectedTable(null)}
                className="text-red-500 text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
            <ul className="mt-5">
              {displayOrder && (
                <>
                  {displayOrder.OrderItems?.map(({ Item, index }) => (
                    <li key={Item.id || index} className="my-2 flex justify-between">
                      <p>{Item.name}</p>{" "}
                      <p className="font-medium">${Item.price}</p>
                    </li>
                  ))}
                  <p className="text-right mt-5 text-xl font-medium">
                    TOTAL: $ {displayOrder.total_amount}
                  </p>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
