import { useState } from "react";
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <InputField
        label="Nombre del comercio"
        type="text"
        name="name"
        value={formData.name || ""}
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
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        placeholder="Ingresa una contraseña"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <div className="flex flex-col lg:flex-row items-center gap-5 mt-5">
        <input
          type="submit"
          disabled={isLoading}
          value={isLoading ? "Cargando.." : "Registrarse"}
          className="w-full md:w-[auto] bg-[#D4AF37] disabled:bg-slate-200 text-lg px-10 py-3 rounded  cursor-pointer"
        />

        <p className="text-center flex flex-col lg:flex-row lg:gap-1">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-800 font-bold">
            Iniciar sesión
          </a>
        </p>

      </div>
    </form>
  );
};

export default RegisterForm;
