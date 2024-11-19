import { useState, useEffect } from "react";
import SideTableInfo from "../components/SideTableInfo.jsx";
import TableSelector from "../components/TableSelector.jsx";
import TableAdminModal from "../components/TableAdminModal.jsx";
import socket from "../socket.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [displayOrder, setDisplayOrder] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [showAdminTable, setShowAdminTable] = useState(false);

  useEffect(() => {
    socket.on("order", (newOrder) => handleNewOrder(newOrder));
    return () => {
      // se limpia el socket: esto sucede por el lifecycle que tiene un componente en react. Si no lo haces
      // se duplica todo.
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
    <section className="bg-gray-100 min-h-screen flex">
      <SideTableInfo
        orders={orders}
        setDisplayOrder={setDisplayOrder}
        displayOrder={displayOrder}
        selectedTable={selectedTable}
      />
      <div className="p-10">
        <h1 className="font-bold text-2xl mb-2">Mesas</h1>
        <p>
          Aqui podrás ver las ordenes que recibe tu restaurante en tiempo real.
        </p>
        <TableSelector
          setSelectedTable={setSelectedTable}
          tables={tables}
          setTables={setTables}
        />
      </div>

      <div className="flex gap-3 fixed bottom-0 right-0 p-10">
        <button
          onClick={() => setShowAdminTable(!showAdminTable)}
          className="bg-[var(--yellow-color)] text-white font-medium p-2 rounded-lg"
        >
          Administrar mesas
        </button>
      </div>

      <TableAdminModal
        setShowModal={setShowAdminTable}
        showModal={showAdminTable}
        tables={tables}
        setTables={setTables}
      />
    </section>
  );
}
