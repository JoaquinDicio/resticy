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
    <div className="flex flex-col my-3">
      <label className="mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b-2 border-black py-2 outline-none"
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
