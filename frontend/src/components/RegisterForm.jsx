import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", formData);
      console.log("User registered:", response.data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <InputField
        label="Nombre del comercio"
        type="text"
        name="name"
        value={formData.nombre || ""}
        onChange={handleChange}
        placeholder="Pizzeria Don Juan"
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange} 
        placeholder="TuEmpresa@gmail.com"
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        placeholder="Ingresa una contraseña"
      />

      <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
        <input type="submit" value="Registrarse" className="bg-[#D4AF37] px-10 py-3 rounded-[40px]" />
        <p>¿Ya tienes una cuenta? <a href="#" className="text-blue-800">Inicia Sesion</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;
