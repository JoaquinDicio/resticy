import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsideList = ({ restaurantId }) => {
  const [dishes, setDishes] = useState([]);
  
  useEffect(() => {
    const fetchPopularDishes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/restaurant/${restaurantId}/popular-dishes`);
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching popular dishes:", error);
      }
    };
    
    fetchPopularDishes();
  }, [restaurantId]);

  return (
    <div className="w-full px-5 bg-[#FFFFF0] min-h-[full] rounded-lg overflow-hidden">
  <div className="max-h-[200px] overflow-y-auto">
    {dishes.map((item, index) => (
      <div
        key={index}
        className={`p-3 mb-3 rounded-lg flex justify-between items-center bg-[#D4AF37]/10`}
      >
        <p className="text-lg font-medium text-[#333]">{item.name}</p>
        <p className="text-lg font-semibold text-[#D4AF37]">Cantidad: {item.quantity}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default AsideList;
