import useAxios from "../hooks/useAxios";
import InputField from "./InputField";
import { useEffect, useState } from "react";

export default function EditItemModal({
  selectedItem,
  setSelectedItem,
  onClose,
  onEdit,
}) {
  const { axiosPut, errors } = useAxios();
  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    setFormData({
      name: selectedItem.name,
      price: selectedItem.price,
    });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updateData = { ...formData, id: selectedItem?.id };

    const response = await axiosPut("http://localhost:8080/items", updateData);

    console.log(response);

    if (response.data) {
      setSelectedItem(null);
      onClose();
      onEdit();
    }
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/70 z-20">
      <div className="p-4 bg-white shadow-lg z-50 transform transition-transform duration-300">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              label="Nombre"
              type="text"
              placeholder="Hamburguesa"
              onChange={(e) => handleChange(e)}
              name="name"
              value={formData.name}
            />
            <i className="text-sm text-red-500">{errors?.name}</i>
          </div>
          <div className="mb-4">
            <InputField
              label="Precio"
              type="number"
              placeholder="12000"
              onChange={(e) => handleChange(e)}
              name="price"
              value={formData.price}
            />
            <i className="text-sm text-red-500">{errors?.price}</i>
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
