import { useContext, useEffect, useState } from "react";
import TotalCard from "../components/Dashboard/TotalCard";
import TotalMouthAndYear from "../components/Dashboard/TotalMouthAndYear";
import AsideData from "../components/Dashboard/AsideData";
import Charts from "../components/Dashboard/Charts";
import AsideChart from "../components/Dashboard/AsideChart";
import AsideList from "../components/Dashboard/AsideList";
import { AuthContext } from "../context/AuthContext";
import useStats from "../hooks/useStats";

const Dashboard = () => {
  // TODO -> USER NO DEBERIA ESTAR EN ESTE COMPONENTE
  const { user } = useContext(AuthContext);

  const { dailyTotal, monthlyData, ordersWeekQuantity, ordersMonthQuantity } =
    useStats();

  return (
    <div className="pt-20 p-4 md:p-20 md:pt-22 grid gap-5">
      <h1 className="text-white text-4xl pb-8 text-start">
        Panel de estadísticas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TotalCard dailyTotal={dailyTotal} />

        <TotalMouthAndYear restaurantID={user?.restaurantID} />

        <div className="flex flex-col gap-5 rounded-lg overflow-hidden">
          <AsideData
            quantity={ordersMonthQuantity}
            title={"órdenes  mensuales"}
            typeIcon={"analytics"}
          />

          <AsideData
            quantity={ordersWeekQuantity}
            title={"órdenes  semanales"}
          />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-3 gap-5 max-h-[auto] overflow-hidden">
        <div className=" md:col-span-2 flex rounded-lg overflow-hidden">
          <Charts monthlyData={monthlyData} />
        </div>
        <div className="bg-[var(--marfil-color)] rounded-lg overflow-hidden flex flex-col">
          <AsideChart />
          <div className="flex-1 overflow-hidden">
            <AsideList restaurantId={user?.restaurantID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
