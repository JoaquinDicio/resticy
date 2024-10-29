import React, { useState } from "react";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth.jsx";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const { error, isLoading, register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    // esto es todo lo que debe hacer el handle submit
    // para que la logica de peticion sea aisalada del componente
    
    e.preventDefault();

    try {
      await register(formData);
    } catch {
      console.log(error.value)
    }

  }

  return (

    <form onSubmit={handleSubmit} className="flex flex-col">
      <p>{error || ""}</p>
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
        <input
          type="submit"
          disabled={isLoading}
          value={isLoading ? "Cargando.." : "Registrarse"}
          className="bg-[#D4AF37] disabled:bg-slate-200 px-10 py-3 rounded-[40px]"
        />
        <p>
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-blue-800">
            Inicia Sesion
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
