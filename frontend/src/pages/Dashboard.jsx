import React, { useContext, useEffect, useState } from 'react';
import TotalCard from '../components/Dashboard/TotalCard';
import TotalMouthAndYear from '../components/Dashboard/TotalMouthAndYear';
import AsideData from '../components/Dashboard/AsideData';
import Charts from '../components/Dashboard/Charts';
import AsideChart from '../components/Dashboard/AsideChart';
import AsideList from '../components/Dashboard/AsideList';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {

  const { user } = useContext(AuthContext); 
  const [restaurantID, setRestaurantID] = useState();
  const [dailyTotal, setDailyTotal] = useState()
  const [ordersWeekQuantity, setOrdersWeekQuantity] = useState()
  const [ordersMonthlyQuantity, setOrdersMonthlyQuantity] = useState()

  useEffect(()=>{
    if(user){
      setRestaurantID(user.restaurantID)
    }
  },[user])

  useEffect(() => {
    const getRestaurantSummary = async () => {
      if (!restaurantID) return;
  
      try {
        const response = await fetch(`http://localhost:8080/payment/summary/${restaurantID}`);
        const restaurantSummary = await response.json();
        
        setDailyTotal(restaurantSummary.dailyTotal)

      } catch (error) {
        console.error("❌ Error obteniendo el resumen:", error);
      }
    };
  
    getRestaurantSummary();
  }, [restaurantID]);

  useEffect(()=>{
    const fetchingWeekQuantity = async ()=>{
        const {data} = await axios.get(`http://localhost:8080/restaurant/1/weekly`)
        const ordersWeekQuantity = data.data.length;
        setOrdersWeekQuantity(ordersWeekQuantity);
    }

    const fetchingMonthlyQuantity = async ()=>{
      const {data} = await axios.get(`http://localhost:8080/restaurant/1/monthly`)
      const ordersMonthlyQuantity = data.data.length;
      setOrdersMonthlyQuantity(ordersMonthlyQuantity);
  }
    fetchingWeekQuantity()
    fetchingMonthlyQuantity()

  },[])


  return (
    <div className='pt-20 p-4 md:p-20 md:pt-24 grid gap-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <TotalCard dailyTotal={dailyTotal} />
        {restaurantID && <TotalMouthAndYear restaurantID={restaurantID} />}
        <div className='flex flex-col gap-5 rounded-lg overflow-hidden'>
          {restaurantID && <AsideData quantity={ordersMonthlyQuantity} title={'Ordenes mensuales'} typeIcon={"analytics"} />}
          {restaurantID && <AsideData quantity={ordersWeekQuantity} title={'Ordenes semanales'} />
        }
        </div>
      </div>

      <div className='grid flex-1 grid-cols-1 md:grid-cols-3 gap-5 max-h-[auto] overflow-hidden'>
        <div className=' md:col-span-2 flex rounded-lg overflow-hidden'>
          <Charts restaurantId={restaurantID}/>
        </div>
        <div className='bg-[var(--marfil-color)] rounded-lg overflow-hidden flex flex-col'>
          <AsideChart />
          <div className='flex-1 overflow-hidden'>
            <AsideList restaurantId={restaurantID}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;