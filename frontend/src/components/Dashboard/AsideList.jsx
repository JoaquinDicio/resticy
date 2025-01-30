const data = [
    { name: 'Pizza', amount: 10 },
    { name: 'Burger', amount: 15 },
    { name: 'Pasta', amount: 12 },
    { name: 'Salad', amount: 8 },
    { name: 'Sushi', amount: 20 },
    { name: 'Tacos', amount: 14 },
    { name: 'Steak', amount: 25 },
    { name: 'Sandwich', amount: 7 },
];

const AsideList = () => {
  return (
    <div className="w-full px-5 bg-[#FFFFF0] rounded-lg  overflow-hidden">

      <div className="max-h-[300px] overflow-y-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-3 mb-3 rounded-lg flex justify-between items-center bg-[#D4AF37]/10`}
          >
            <p className="text-lg font-medium text-[#333]">{item.name}</p>
            <p className="text-lg font-semibold text-[#D4AF37]">$ {item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsideList;