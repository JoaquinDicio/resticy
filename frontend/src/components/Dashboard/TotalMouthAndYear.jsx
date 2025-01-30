import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const TotalMouthAndYear = () => {
  const [activeButton, setActiveButton] = useState('año');
  const dataMouth = [1, 4, 2, 5, 7, 2, 4, 6];
  const dataAge = [10, 20, 15, 30, 25, 40, 35, 50];

  return (
    <>
      <div className="text-white flex items-center bg-[var(--yellow-color)] h-[17vh] md:h-[auto] overflow-hidden p-3 rounded-lg relative">
        <div className="absolute w-[200px] h-[200px] bottom-20 right-[-10%] bg-[#aa8d2c] bg-opacity-50 p-1 rounded-full z-10"></div>
        <div className="absolute w-[200px] h-[200px] bottom-12 right-[-25%] bg-[#aa8d2c] p-1 rounded-full z-10"></div>
        <div className='z-20'>
          <div className='absolute top-2 right-2 z-20 flex w-[40%] gap-3 p-2 z-20'>
            <button
              className={`w-full rounded p-2 ${activeButton === 'mes' ? 'bg-[#ffc814]' : 'bg-transparent'}`}
              onClick={() => setActiveButton('mes')}
            >
              Mes
            </button>
            <button
              className={`w-full rounded p-2 ${activeButton === 'año' ? 'bg-[#ffc814]' : 'bg-transparent'}`}
              onClick={() => setActiveButton('año')}
            >
              Año
            </button>
          </div>

          <p className="z-20 text-4xl bold font-bold mb-2">
            {activeButton === 'mes' ? '$1800.00' : '$6000.00'}
          </p>
          <span>
            Total Acumulado en el {activeButton === 'mes' ? 'mes' : 'año'}
          </span>
        </div>
        <Box sx={{ width: '100%', mt: 2 }} className='z-20'>
          <SparkLineChart
            data={activeButton === 'mes' ? dataMouth : dataAge} // Datos de la línea
            height={100} // Altura del gráfico
            showHighlight={true} // Resaltar puntos
            showTooltip={true} // Mostrar tooltip al pasar el mouse
            colors={['#fffff0']} // Color de la línea (amarillo)
          />
        </Box>
      </div>
    </>
  );
};

export default TotalMouthAndYear;