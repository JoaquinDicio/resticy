import { useState } from "react";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({});
  const { authenticate, error, isLoading } = useAuth();

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
      method="POST"
      className="flex flex-col"
    >
      <InputField
        label="Email"
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="TuEmpresa@gmail.com"
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Ingresa una contraseña"
      />
      {error && <p className="text-red-500">{error.message}</p>}

      <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
        <input
          type="submit"
          disabled={isLoading}
          value={isLoading ? "Autenticando.." : "Iniciar sesión"}
          className="bg-[#D4AF37] px-10 py-3 rounded w-full md:w-[auto] cursor-pointer"
        />
      </div>
    </form>
  );
}
