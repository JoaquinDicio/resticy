import { useState, useEffect } from "react";
import SideTableInfo from "../components/SideTableInfo.jsx";
import TableSelector from "../components/TableSelector.jsx";
import TablesAdminModal from "../components/TablesAdminModal.jsx";
import socket from "../socket.js";
import useAxios from "../hooks/useAxios.jsx";

export default function Orders() {
  const { axiosGet, isLoading } = useAxios();
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [showAdminTables, setShowAdminTables] = useState(false);
  const [showSide, setShowSide] = useState(false);

  useEffect(() => {
    socket.on("order", (newOrder) => handleNewOrder(newOrder));
    return () => {
      // se limpia el socket: esto sucede por el lifecycle que tiene un componente en react. Si no lo haces asi
      // se duplica todo.
      socket.off("order");
    };
  }, []);

  useEffect(() => {
    async function getPendingOrders() {
      const response = await axiosGet(
        "http://localhost:8080/restaurants/orders"
      );

      response.data.forEach((order) => {
        handleNewOrder(order);
      });
    }

    getPendingOrders();
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
    <section className="bg-gray-100 min-h-screen flex ">
      {showSide && (
        <SideTableInfo
          orders={orders}
          selectedTable={selectedTable}
          setModal={setShowSide}
        />
      )}
      <div className="p-10 pt-20">
        <h1 className="font-bold text-2xl mb-2">Mesas</h1>
        <p>
          Aqui podrás ver las ordenes que recibe tu restaurante en tiempo real.
        </p>
        <TableSelector
          setModal={setShowSide}
          setSelectedTable={setSelectedTable}
          tables={tables}
          setTables={setTables}
        />
      </div>

      <div className="flex gap-3 fixed bottom-0 right-0 p-10">
        <button
          onClick={() => setShowAdminTables(!showAdminTables)}
          className="bg-[var(--yellow-color)] text-white font-medium p-2 rounded"
        >
          Administrar mesas
        </button>
      </div>

      {showAdminTables && (
        <TablesAdminModal
          setShowModal={setShowAdminTables}
          tables={tables}
          setTables={setTables}
        />
      )}
    </section>
  );
}
