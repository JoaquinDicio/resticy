import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

const data = [
    { value: 1 },
    { value: 4 },
    { value: 2 },
    { value: 5 },
    { value: 7 },
    { value: 2 },
    { value: 4 },
    { value: 6 },
];

const AsideChart = () => {
    return (
        <>
                <div className="w-full h-[300px] p-5 rounded-lg">
                    <p className="text-2xl">Platos más pedidos</p>
                    <ResponsiveContainer width="100%" height="100%" className="rounded-lg pt-5">
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="backgroundGold" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a0842a" stopOpacity={0.10} />
                                    <stop offset="95%" stopColor="#a0842a" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="index" 
                                axisLine={false}
                                tickLine={false}
                                padding={{ left: 0, right: 0 }}
                            />
                            <YAxis hide />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="none"
                                fill="url(#colorGold)"
                            />
                            {/* Fondo redondeado */}
                            <rect
                                x={0}
                                y={0}
                                width="100%"
                                height="100%"
                                fill="url(#backgroundGold)"
                                rx={10}
                                ry={10}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
        </>
    );
};

export default AsideChart;