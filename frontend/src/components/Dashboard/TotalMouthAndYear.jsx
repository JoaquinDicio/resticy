import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import axios from "axios";

const TotalMouthAndYear = ({ restaurantID, monthPayments }) => {
  const [activeButton, setActiveButton] = useState("año");
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalWeek, setTotalWeek] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWeeklyPayments = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/payments/weekly/${restaurantID}`
        );
        const weeklyData = data.map((payment) => parseFloat(payment.amount));
        const totalAmount = weeklyData.reduce(
          (total, amount) => total + amount,
          0
        );

        setTotalWeek(totalAmount);
        setWeeklyData(weeklyData);
      } catch (error) {
        console.error("Error obteniendo pagos mensuales:", error);
      }
    };
    fetchWeeklyPayments();
  }, []);

  return (
    <div className="text-white flex items-center bg-[var(--yellow-color)] h-[25vh] md:h-[auto] overflow-hidden p-5 py-10 rounded-lg relative">
      <div className="absolute w-[200px] h-[200px] bottom-20 right-[-10%] bg-[#aa8d2c] bg-opacity-50 p-1 rounded-full z-10"></div>
      <div className="absolute w-[200px] h-[200px] bottom-12 right-[-25%] bg-[#aa8d2c] p-1 rounded-full z-10"></div>
      <div className="z-20">
        <div className="absolute top-2 right-2 z-20 flex w-[40%] gap-3 p-2">
          <button
            className={`w-full font-bold rounded p-2 ${
              activeButton === "mes" ? "bg-[#ffc814]" : "bg-transparent"
            }`}
            onClick={() => setActiveButton("mes")}
          >
            Mes
          </button>
          <button
            className={`w-full font-bold rounded p-2 ${
              activeButton === "año" ? "bg-[#ffc814]" : "bg-transparent"
            }`}
            onClick={() => setActiveButton("año")}
          >
            Semana
          </button>
        </div>

        <p className="z-20 text-4xl bold font-bold mb-2">
          ${activeButton === "mes" ? monthPayments.totalAmount : totalWeek}
        </p>
        <p className="w-[130px]">
          Total acumulado por {activeButton === "mes" ? " mes" : "semana"}
        </p>
      </div>
    </div>
  );
};

export default TotalMouthAndYear;
