import { useState, useEffect } from "react";
import SideTableInfo from "../components/Orders/SideTableInfo.jsx";
import TableSelector from "../components/Orders/TableSelector.jsx";
import TablesAdminModal from "../components/Orders/TablesAdminModal.jsx";
import socket from "../socket.js";
import useAxios from "../hooks/useAxios.jsx";
import CustomButton from "../components/CustomButton.jsx";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/toastConfig.js";
import UseTables from "../hooks/useTables.jsx";

export default function Orders() {
  const { axiosGet } = useAxios();
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const { tables, setTables, createTable, isPosting, error, deleteTable } = UseTables();
  const [showAdminTables, setShowAdminTables] = useState(false);
  const [showSide, setShowSide] = useState(false);

  useEffect(() => {
    socket.on("order", (newOrder) => handleNewOrder(newOrder));
    socket.on("order-payment", (order) => handleNewPayment(order));
    socket.on("order-update", (order) => handleOrderUpdate(order));
    return () => {
      // se limpia el socket: esto sucede por el lifecycle que tiene un componente en react. Si no lo haces asi
      // se duplica todo.
      socket.off("order");
      socket.off("order-payment");
      socket.off("order-update");
    };
  }, []);

  useEffect(() => {
    async function getPendingOrders() {
      const baseUrl = import.meta.env.VITE_API_URL;

      const response = await axiosGet(`${baseUrl}/restaurants/orders`);

      response.data.forEach((order) => {
        handleNewOrder(order);
      });
    }

    getPendingOrders();
  }, []);

  function handleShowToast(message, type) {
    showToast(message, type);
  }

  function handleNewOrder(newOrder) {
    setOrders((prev) => [...prev, newOrder]);
    const tableId = newOrder.table_id;
    // actualiza el estado para mostrar la campanita en la mesa correspondiente
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, hasOrders: true } : { ...table }
      )
    );
  }

  function handleNewPayment(order) {
    const { id } = order;

    setOrders((prevOrders) => {
      return prevOrders.map((oldOrder) =>
        oldOrder.id === id ? { ...oldOrder, is_payed: true } : oldOrder
      );
    });
  }

  function handleOrderUpdate(order) {
    const { id, table_id, is_completed } = order;

    if (is_completed == true) {
      // si la orden se marco como completada la elimina
      const newOrders = orders.filter((anOrder) => anOrder.id !== id);
      setOrders(newOrders);

      // verifica si hay mas Órdenes en la mesa
      const ordersInTable = newOrders.filter(
        (order) => order.table_id === table_id
      );

      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === table_id
            ? { ...table, hasOrders: ordersInTable.length > 0 }
            : table
        )
      );

      return;
    }

    // si el cambio fue otro, por ejemplo cambio el estado del pago, actualiza en el array orders
    setOrders((prevOrders) => {
      return prevOrders.map((oldOrder) =>
        oldOrder.id === id ? { ...oldOrder, ...order } : oldOrder
      );
    });
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
      <div className="p-10 pt-24">
        <h1 className="font-bold text-2xl mb-2">Mesas</h1>
        <p>
          Aqui podrás ver las órdenes que recibe tu restaurante en tiempo real.
        </p>
        <TableSelector
          setModal={setShowSide}
          setSelectedTable={setSelectedTable}
          tables={tables}
          setTables={setTables}
        />
      </div>
      <div className="flex gap-3 fixed bottom-0 right-0 p-10">
        <CustomButton
          text="Administrar mesas"
          onClick={() => setShowAdminTables(!showAdminTables)}
        />
      </div>
      {showAdminTables && (
        <TablesAdminModal
          setShowModal={setShowAdminTables}
          tables={tables}
          createTable={createTable}
          isPosting={isPosting}
          handleShowToast={handleShowToast}
          deleteTable={deleteTable}
          error={error}
        />
      )}
      <ToastContainer className="custom-toast-container" />
    </section>
  );
}
