import useAxios from "../hooks/useAxios";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

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

    if (response.data) {
      setSelectedItem(null);
      onClose();
      onEdit();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[var(--marfil-color)] min-w-[40vw] w-[95vw] p-10 rounded-lg relative">
        <div className="flex items-center justify-between">
          <h2 className="text-start text-2xl lg:text-4xl">Editar Producto</h2>
          <button
            type="button"
            onClick={onClose}
          >
            <ClearIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
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
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-10 py-2 rounded-lg bg-[#d4af37] mt-5 text-white"
            >
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>

  );
}
