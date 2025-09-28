import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const Charts = ({ monthlyData }) => {
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
