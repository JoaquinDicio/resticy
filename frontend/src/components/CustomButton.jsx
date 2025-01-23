import React from "react";

const CustomButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`transition hover:bg-[#c09e30] bg-[var(--yellow-color)] text-white font-medium p-2 rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;