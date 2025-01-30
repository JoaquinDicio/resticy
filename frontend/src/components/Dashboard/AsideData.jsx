import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';

const AsideData = ({ title, amount, typeIcon }) => {
    const Icon = typeIcon === 'analytics' ? AnalyticsIcon : AssessmentIcon;

    return (
        <>
        <div className='bg-[var(--yellow-color)] text-white h-[10vh] md:h-[50%] rounded-lg px-5 flex items-center gap-3 relative overflow-hidden'>
        <div className="absolute w-[300px] h-[300px] bottom-[-10] right-[-15%] bg-[#aa8d2c] bg-opacity-50 p-1 rounded-full z-10"></div>
        <div className="absolute w-[300px] h-[300px] bottom-[-10] right-[-25%] bg-[#aa8d2c]  p-1 rounded-full z-10"></div>
        <div className="absolute w-[300px] h-[300px] bottom-[-10] right-[-35%] bg-[#887023]  p-1 rounded-full z-10"></div>
        <Icon sx={{ fontSize: 55 }}/>
        <div className="flex flex-col items-start justify-center z-20">
            <p className="font-bold text-xl">${amount}</p>
            <p className="text-sm">{title}</p>
        </div>
        </div>
            
       
        </>
    );
}

export default AsideData;
