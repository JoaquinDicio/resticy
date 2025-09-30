import { useState } from "react";

const AsideList = ({ popularDishes }) => {

  return (
    <div className="w-full px-5 bg-[#FFFFF0] min-h-[20vh] rounded-lg overflow-hidden">
      <div className="max-h-[200px] overflow-y-auto">
        {popularDishes.length == 0 ?
          (<p>No hay platos populares</p>
          ) : (
            popularDishes.map((item, index) => (
              <div
                key={index}
                className="p-3 mb-3 rounded-lg flex justify-between items-center bg-[#D4AF37]/10"
              >
                <p className="text-lg font-medium text-[#333]">{item.name}</p>
                <p className="text-lg font-semibold text-[#D4AF37]">
                  Cantidad: {item.quantity}
                </p>
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default AsideList;
