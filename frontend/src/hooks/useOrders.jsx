import { useState, useEffect } from "react";
import socket from "../socket";
import useAxios from "./useAxios";

export default function useOrders(setTables) {
  const [orders, setOrders] = useState([]);
  const { axiosGet } = useAxios();

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

  function handleNewOrder(newOrder) {
    setOrders((prev) => [...prev, newOrder]);

    const tableId = newOrder.table_id;

    // actualiza el estado para mostrar la campanita en la mesa correspondiente
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id == tableId ? { ...table, hasOrders: true } : table
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
      setOrders((prevOrders) =>
        prevOrders.filter((anOrder) => anOrder.id != id)
      );

      // verifica si hay mas Órdenes en la mesa
      const newOrders = orders.filter((anOrder) => anOrder.id !== id);
      const ordersInTable = newOrders.filter(
        (order) => order.table_id == table_id
      );

      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id == table_id
            ? { ...table, hasOrders: ordersInTable.length > 0 }
            : table
        )
      );
      return;
    }

    //si el cambio fue otro, por ejemplo cambio el estado del pago, actualiza en el array orders
    setOrders((prevOrders) => {
      return prevOrders.map((oldOrder) =>
        oldOrder.id == id ? { ...oldOrder, ...order } : oldOrder
      );
    });
  }

  return { orders };
}
