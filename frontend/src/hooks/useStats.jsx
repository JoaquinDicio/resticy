import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

export default function useStats() {
  const [dailyTotal, setDailyTotal] = useState(0);

  const [ordersWeekQuantity, setOrdersWeekQuantity] = useState(0);

  const [ordersMonthQuantity, setOrdersMonthQuantity] = useState(0);

  const [monthlyData, setMonthlyData] = useState([]);

  const { user } = useContext(AuthContext);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getRestaurantDaliy();
    getRestaurantMonthlyData();
    getOrdersWeekQuantity();
    getOrdersMonthQuantity();
  }, [user]);

  // gets the daily summary with withdrawed chash
  async function getRestaurantDaliy() {
    try {
      const response = await fetch(
        `${baseUrl}/payments/summary/${user?.restaurantID}`
      );

      const data = await response.json();

      setDailyTotal(data.dailyTotal);
    } catch (e) {
      console.log("Error obteniendo el resumen diario", e);
    }
  }

  // returns the total number of orders for each month, used for the chart
  async function getRestaurantMonthlyData() {
    try {
      const response = await axios.get(
        `${baseUrl}/payments/monthly-summary/${user?.restaurantID}`
      );

      const fixedData = [
        { month: "Enero", total: 0 },
        { month: "Febrero", total: 0 },
        { month: "Marzo", total: 0 },
        { month: "Abril", total: 0 },
        { month: "Mayo", total: 0 },
        { month: "Junio", total: 0 },
        { month: "Julio", total: 0 },
        { month: "Agosto", total: 0 },
        { month: "Septiembre", total: 0 },
        { month: "Octubre", total: 0 },
        { month: "Noviembre", total: 0 },
        { month: "Diciembre", total: 0 },
      ];

      // Actualizar valores con los datos de la API
      response.data.forEach((item) => {
        const monthNumber = parseInt(item.month.split("-")[1], 10);
        fixedData[monthNumber - 1].total = item.total;
      });

      setMonthlyData(fixedData);
    } catch (e) {
      console.log("Error obteniendo la data mensual:", e);
    }
  }

  //returns the total number of orders in the current week
  async function getOrdersWeekQuantity() {
    try {
      const response = await axios.get(
        `${baseUrl}/restaurant/${user?.restaurantID}/weekly`
      );

      if (response.status == 200) setOrdersWeekQuantity(response.data.length);
    } catch (e) {
      console.log("Error obteniendo la cantidad semanal:", e);
    }
  }

  //returns the total number of orders in the current month
  async function getOrdersMonthQuantity() {
    try {
      const response = await axios.get(
        `${baseUrl}/restaurant/${user?.restaurantID}/monthly`
      );

      setOrdersMonthQuantity(response.data);
    } catch (e) {
      console.log("Error obteniendo la cantidad de ordenes mensuales:", e);
    }
  }

  return {
    dailyTotal,
    ordersWeekQuantity,
    getRestaurantDaliy,
    getRestaurantMonthlyData,
    monthlyData,
    getOrdersWeekQuantity,
    getOrdersMonthQuantity,
    ordersMonthQuantity,
  };
}
