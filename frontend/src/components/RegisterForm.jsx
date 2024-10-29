import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth.jsx";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const { errors, isLoading, register } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(formData);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <InputField
        label="Nombre del comercio"
        type="text"
        name="name"
        value={formData.name || ""} 
        onChange={handleChange}
        placeholder="Pizzeria Don Juan"
      />
      {errors.nameError && <p className="text-red-500">{errors.nameError}</p>}
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="TuEmpresa@gmail.com"
      />
      {errors.emailError && <p className="text-red-500">{errors.emailError}</p>}
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        placeholder="Ingresa una contraseña"
      />
      {errors.passwordError && <p className="text-red-500">{errors.passwordError}</p>} 

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
            Inicia Sesión
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
