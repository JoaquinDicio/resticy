import { useState } from "react";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const [formData, setFormData] = useState({});
  const { authenticate, errors, isLoading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await authenticate(formData);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      action=""
      method="POST"
      className="flex flex-col"
    >
      {errors.credentials && (
        <p className="text-red-500">{errors.credentials}</p>
      )}
      <InputField
        label="Email"
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="TuEmpresa@gmail.com"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Ingresa una contraseña"
      />
      <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
        <input
          type="submit"
          disabled={isLoading}
          value={isLoading ? "Autenticando.." : "Iniciar sesión"}
          className="bg-[#D4AF37] px-10 py-3 rounded w-full md:w-[auto] cursor-pointer"
        />
        <p className="text-center flex flex-col 2xl:flex-row lg:gap-1">
          ¿Olvidaste tu contraseña?{" "}
          <a href="/register" className="text-blue-800 font-bold">
            Recuperar contraseña
          </a>
        </p>
      </div>
    </form>
  );
}
