import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';

const AsideData = ({ title, typeIcon , quantity}) => {
    const Icon = typeIcon === 'analytics' ? AnalyticsIcon : AssessmentIcon;
    const backgroundColor = typeIcon === 'analytics' ? 'bg-[--yellow-color]' : 'bg-[var(--marfil-color)]';
    const iconColor = typeIcon === 'analytics' ? 'white' : '#d4af37'; // Blanco para analytics, negro para assessment

    return (
        <>
        <div className={`h-[20vh] md:h-[50%] rounded-lg px-5 flex items-center gap-3 relative overflow-hidden ${backgroundColor} text-${iconColor}`}>

        {Icon === AnalyticsIcon && (
            <>
            <div className="absolute w-[130px] h-[130px] bottom-[10%] right-[-5%] bg-[#aa8d2c] bg-opacity-50 p-1 rounded-full z-10"></div>
            <div className="absolute w-[130px] h-[130px] bottom-[-50%] right-[-10%] bg-[#aa8d2c] p-1 rounded-full z-10"></div>
            </>
        )}
            
        <Icon sx={{ fontSize: 55, color: iconColor }} />
        <div className={`flex items-center gap-1 items-start justify-center z-20`}>
        <p className="font-[sans-serif] font-bold text-xl">{quantity}</p>
            <p className="text-md ">{title}</p>
        </div>
        </div>
        </>
    );
}

export default AsideData;