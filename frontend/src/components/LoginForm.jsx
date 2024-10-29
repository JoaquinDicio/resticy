import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const [formData, setFormData] = useState({})
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

  useEffect(() => {
    if (errors.credentialsError) {
      console.log("Errores de autenticación:", errors.credentialsError);
    }
  }, [errors]);
  

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      action=""
      method="POST"
      className="flex flex-col"
    >
      {errors.credentialsError && <p className="text-red-500">{errors.credentialsError}</p>}
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
      <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
        <input
          type="submit"
          disabled={isLoading}
          value={isLoading ? "Autenticando.." : "Iniciar sesion"}
          className="bg-[#D4AF37] px-10 py-3 rounded-[40px]"
        />
        <p className="">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-800">
            {" "}
            Registrarse{" "}
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
