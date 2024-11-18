import React from "react";

export default function InputField({
  label,
  type,
  placeholder,
  onChange,
  name,
  value,
  max,
  defaultValue,
}) {
  return (
    <div className="flex flex-col">
      <label className="mt-5 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b border-b-2 border-black mb-5"
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        max={max}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
