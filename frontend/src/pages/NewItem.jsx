import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import InputField from "../components/InputField";

export default function NewItem() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    restaurant_id: "1",
  });

  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState(null);
  const { axiosPost } = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/items";

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("price", formData.price);
    formDataObj.append("restaurant_id", formData.restaurant_id);

    if (formData.file) {
      formDataObj.append("img", formData.file);
    }

    try {
      setIsPosting(true);
      await axiosPost(url, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      setErrors(error.message);
    } finally {
      setFormData({
        name: "",
        price: "",
        restaurant_id: "1",
        file: null,
      });
      setIsPosting(false);
    }
  };

  return (
    <div className="w-screen bg-[#51161F] h-screen flex justify-center items-center">
      <div className="w-full sm:max-w-sm lg:max-w-lg bg-[#FFFFF0] rounded-[20px] p-5">
        <h1 className="text-center text-2xl font-semibold">
          Añadir un nuevo producto
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputField
              label="Nombre del producto"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hamburguesa"
              required
            />
          </div>
          <div>
            <InputField
              label="Precio"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ej: 12000"
              max="100000"
              required
            />
          </div>
          <div>
            <InputField
              label="Restaurant ID"
              type="number"
              name="restaurant_id"
              value={formData.restaurant_id}
              onChange={handleChange}
              placeholder="Ej: 1"
              required
            />
          </div>
          <div className="my-5">
            <label htmlFor="img" className="mr-4 block">
              Imagen:
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-10 py-2 rounded-[20px] bg-[#d4af37] mt-5 w-full"
            disabled={isPosting}
          >
            {isPosting ? "Enviando..." : "Enviar"}
          </button>
        </form>
        {errors && <p className="text-red-500 text-center mt-2">{errors}</p>}
      </div>
    </div>
  );
}
