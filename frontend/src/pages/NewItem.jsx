import React, { useState, useRef, useContext, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import InputField from "../components/InputField";
import Cookies from "js-cookie";

export default function NewItem() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [user, setUser] = useState(JSON.parse(Cookies.get("user")));

  console.log(user);
  const { axiosPost, errors, isPosting } = useAxios();
  const fileInputRef = useRef(null);

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

    if (
      formData.name != "" &&
      formData.price != "" &&
      formData.restaurant_id != ""
    ) {
      formDataObj.append("img", formData.file);
    }
    try {
      await axiosPost(url, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
    } finally {
      setFormData({
        name: "",
        price: "",
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-screen bg-[var(--wine-color)] h-screen flex justify-center items-center">
      <div className="w-full sm:max-w-sm lg:max-w-lg bg-[var(--marfil-color)] rounded-lg p-5">
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
            {errors && <p className="text-red-500">{errors.name}</p>}
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
            {errors && <p className="text-red-500">{errors.price}</p>}
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
              ref={fileInputRef}
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
      </div>
    </div>
  );
}
