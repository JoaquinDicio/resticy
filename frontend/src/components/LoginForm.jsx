import React from "react";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const formData = {};
  const { authenticate, error, isLoading } = useAuth();

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
      <InputField
        label="Email"
        type="email"
        placeholder="TuEmpresa@gmail.com"
      />
      <InputField
        label="Contraseña"
        type="password"
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
