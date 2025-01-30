import React from 'react'
import TotalCard from '../components/Dashboard/TotalCard'
import TotalMouthAndYear from '../components/Dashboard/TotalMouthAndYear'
import AsideData from '../components/Dashboard/AsideData'
import Charts from '../components/Dashboard/Charts'

const Dashboard = () => {
  return (
    <div className='p-4 md:p-20 pt-20 grid gap-5 max-h-[100vh]'>
      <div className='grid md:h-[20vh] grid-cols-1 md:grid-cols-3 gap-5'>
        <TotalCard />
        <TotalMouthAndYear />
        <div className='flex flex-col gap-5 rounded-lg overflow-hidden'>
          <AsideData amount={"200"} title={'Estadistica de algo'} typeIcon={"analytics"} />
          <AsideData amount={"500"} title={'Estadistica de algo'} />
        </div>
      </div>
      <div className='grid h-[65vh] grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='md:col-span-2 flex rounded-lg overflow-hidden'>
        <Charts/>
        </div>
        <div className='bg-red-200 h-full rounded-lg overflow-hidden'>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
