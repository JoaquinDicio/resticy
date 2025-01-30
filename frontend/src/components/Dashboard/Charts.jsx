import { BarChart } from '@mui/x-charts/BarChart';

const Charts = () => {
    return (
        <div className="flex items-center justify-center bg-[var(--yellow-color)] w-full h-full min-h-[300px] relative">
            {/* Círculos decorativos */}
            <div className="absolute w-[200px] h-[200px] top-[-20%] right-[-10%] md:w-[400px] md:h-[400px] md:top-[-50%] md:right-[-10%] bg-[#aa8d2c] bg-opacity-50 p-1 rounded-full z-10"></div>
            <div className="absolute w-[200px] h-[200px] top-[-5%] right-[-30%]  md:w-[400px] md:h-[400px] md:top-[-20%] md:right-[-25%] bg-[#aa8d2c]  p-1 rounded-full z-10"></div>

            <BarChart
                className="z-20"
                series={[
                    { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1', color: '#b40024' }, 
                    { data: [14, 6, 5, 8, 9], label: 'Series B1', color: '#7a172b' }, 
                ]}
                barLabel={(item, context) => {
                    if ((item.value ?? 0) > 10) {
                        return <tspan style={{ fill: 'white', fontWeight: 'bold' }}>High</tspan>;
                    }
                    return context.bar.height < 60 ? null : <tspan style={{ fill: 'white' }}>{item.value?.toString()}</tspan>;
                }}
                sx={{
                    width: '100%',
                    height: '100%',
                    '& .MuiChartsAxis-tickLabel, & .MuiChartsAxis-label, & .MuiChartsLegend-series text, & .MuiBarElement-root text': {
                        fill: 'white !important', 
                    },
                    '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                        stroke: 'white !important', 
                    },
                }}
                borderRadius={10}
            />
        </div>
    );
}

export default Charts;
