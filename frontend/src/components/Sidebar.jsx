import React from "react";
import InputField from "../components/InputField";

export default function Sidebar({
  isOpen,
  formData,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <InputField
              label="Nombre"
              type="text"
              placeholder="Hamburguesa"
              onChange={onChange}
              name="name"
              defaultValue={formData.name}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Precio"
              type="number"
              placeholder="12000"
              onChange={onChange}
              name="price"
              defaultValue={formData.price}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[var(--yellow-color)] text-white px-4 py-2 rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
