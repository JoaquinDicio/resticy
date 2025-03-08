import React, { useContext, useEffect, useState } from "react";
import TotalCard from "../components/Dashboard/TotalCard";
import TotalMouthAndYear from "../components/Dashboard/TotalMouthAndYear";
import AsideData from "../components/Dashboard/AsideData";
import Charts from "../components/Dashboard/Charts";
import AsideChart from "../components/Dashboard/AsideChart";
import AsideList from "../components/Dashboard/AsideList";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dailyTotal, setDailyTotal] = useState();
  const [ordersWeekQuantity, setOrdersWeekQuantity] = useState();
  const [ordersMonthlyQuantity, setOrdersMonthlyQuantity] = useState();

  useEffect(() => {
    const getRestaurantSummary = async () => {
      if (!user.restaurantID) return;

      try {
        const response = await fetch(
          `https://resticy-production.up.railway.app/payment/summary/${user?.restaurantID}`
        );
        const restaurantSummary = await response.json();

        setDailyTotal(restaurantSummary.dailyTotal);
      } catch (error) {
        console.error("❌ Error obteniendo el resumen:", error);
      }
    };

    getRestaurantSummary();
  }, [user]);

  useEffect(() => {
    const fetchingWeekQuantity = async () => {
      const { data } = await axios.get(
        `https://resticy-production.up.railway.app/restaurant/${user?.restaurantID}/weekly`
      );
      const ordersWeekQuantity = data.data.length;
      setOrdersWeekQuantity(ordersWeekQuantity);
    };

    const fetchingMonthlyQuantity = async () => {
      const { data } = await axios.get(
        `https://resticy-production.up.railway.app/restaurant/${user?.restaurantID}/monthly`
      );
      const totalOrdersMonthly = data.totalOrders;
      setOrdersMonthlyQuantity(totalOrdersMonthly);
    };
    fetchingWeekQuantity();
    fetchingMonthlyQuantity();
  }, [user]);

  if (user) {
    return (
      <div className="pt-20 p-4 md:p-20 md:pt-22 grid gap-5">
        <h1 className="text-white text-4xl pb-8 text-start">
          Panel de estadísticas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TotalCard dailyTotal={dailyTotal} />
          {user?.restaurantID && (
            <TotalMouthAndYear restaurantID={user?.restaurantID} />
          )}
          <div className="flex flex-col gap-5 rounded-lg overflow-hidden">
            {user?.restaurantID && (
              <AsideData
                quantity={ordersMonthlyQuantity}
                title={"órdenes  mensuales"}
                typeIcon={"analytics"}
              />
            )}
            {user?.restaurantID && (
              <AsideData
                quantity={ordersWeekQuantity}
                title={"órdenes  semanales"}
              />
            )}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 md:grid-cols-3 gap-5 max-h-[auto] overflow-hidden">
          <div className=" md:col-span-2 flex rounded-lg overflow-hidden">
            <Charts restaurantId={user?.restaurantID} />
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
  }
};

export default Dashboard;
