import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

const Charts = ({ restaurantId }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          `https://resticy-production.up.railway.app/payments/monthly-summary/${restaurantId}`
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
      } catch (error) {
        console.error("Error obteniendo los pagos mensuales:", error);
      }
    };

    if (restaurantId) {
      fetchMonthlyData();
    }
  }, [restaurantId]);

  const labels = monthlyData.map((item) => item.month);
  const values = monthlyData.map((item) => item.total);

  return (
    <div className="flex items-center justify-center bg-[var(--marfil-color)] w-full h-full min-h-[300px] relative rounded-lg">
      <BarChart
        className="z-20"
        xAxis={[{ scaleType: "band", data: labels }]}
        series={[
          { data: values, label: "Total de facturado", color: "#D4AF37" },
        ]}
        barLabel={(item, context) => {
          return context.bar.height < 60 ? null : (
            <tspan style={{ fill: "white" }}>{item.value?.toString()}</tspan>
          );
        }}
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiChartsAxis-tickLabel, & .MuiChartsAxis-label, & .MuiChartsLegend-series text, & .MuiBarElement-root text":
            {
              fill: "black !important",
            },
          "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": {
            stroke: "#D4AF37 !important",
          },
        }}
        borderRadius={10}
      />
    </div>
  );
};

export default Charts;
