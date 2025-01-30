import { BarChart } from '@mui/x-charts/BarChart';

const Charts = () => {
    return (
        <div className="flex items-center justify-center bg-[var(--marfil-color)] w-full h-full min-h-[300px] relative rounded-lg">
            <BarChart
                className="z-20"
                series={[
                    { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1', color: '#D4AF37' }, 
                    { data: [14, 6, 5, 8, 9], label: 'Series B1', color: '#D4AF37' }, 
                ]}
                barLabel={(item, context) => {
                    if ((item.value ?? 0) > 10) {
                        return <tspan style={{ fill: 'white', fontWeight: 'bold' }}>Mejor mes</tspan>;
                    }
                    return context.bar.height < 60 ? null : <tspan style={{ fill: 'white' }}>{item.value?.toString()}</tspan>;
                }}
                sx={{
                    width: '100%',
                    height: '100%',
                    '& .MuiChartsAxis-tickLabel, & .MuiChartsAxis-label, & .MuiChartsLegend-series text, & .MuiBarElement-root text': {
                        fill: 'black !important', 
                    },
                    '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                        stroke: '#D4AF37 !important', 
                    },
                }}
                borderRadius={10}
            />
        </div>
    );
}

export default Charts;
