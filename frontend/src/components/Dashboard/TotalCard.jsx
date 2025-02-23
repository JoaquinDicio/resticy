const TotalCard = ({dailyTotal}) => {
  return (
    <>
    <div className="text-white flex  items-center bg-[var(--yellow-color)] overflow-hidden p-5 py-10 h-[25vh] md:h-[auto] rounded-lg relative">
      <div className="absolute w-[200px] h-[200px] bottom-20 right-[-10%] bg-[#aa8d2c] bg-opacity-50 p-1 rounded-full z-10"></div>
      <div className="absolute w-[200px] h-[200px] bottom-12 right-[-25%] bg-[#aa8d2c]  p-1 rounded-full z-10"></div>
      <div className="z-20">
      <p className="z-20 text-4xl font-bold mb-2">${dailyTotal}</p>
      <span>Total acumulado en el día</span>
      </div>
    </div>
    </>
  )
}

export default TotalCard
