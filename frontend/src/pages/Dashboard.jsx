import React from 'react';
import TotalCard from '../components/Dashboard/TotalCard';
import TotalMouthAndYear from '../components/Dashboard/TotalMouthAndYear';
import AsideData from '../components/Dashboard/AsideData';
import Charts from '../components/Dashboard/Charts';
import AsideChart from '../components/Dashboard/AsideChart';
import AsideList from '../components/Dashboard/AsideList';

const Dashboard = () => {
  return (
    <div className='pt-20 p-4 md:p-20 md:pt-24 grid gap-5 md:max-h-screen overflow-hidden'>

      <div className='grid md:h-[20vh] grid-cols-1 md:grid-cols-3 gap-5'>
        <TotalCard />
        <TotalMouthAndYear />
        <div className='flex flex-col gap-5 rounded-lg overflow-hidden'>
          <AsideData amount={"200"} title={'Estadistica de algo'} typeIcon={"analytics"} />
          <AsideData amount={"500"} title={'Estadistica de algo'} />
        </div>
      </div>

      <div className='grid flex-1 grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden'>
        <div className=' md:col-span-2 flex rounded-lg overflow-hidden'>
          <Charts />
        </div>
        <div className='bg-[var(--marfil-color)] rounded-lg overflow-hidden flex flex-col'>
          <AsideChart />
          <div className='flex-1 overflow-hidden'>
            <AsideList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;