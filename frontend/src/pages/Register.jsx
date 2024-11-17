import React from "react";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <main>
      <div className="w-full min-h-screen bg-[var(--wine-color)] flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-[70vw] rounded-lg min-h-[40rem]">
          <img
            className=" max-w-[400px] overflow rounded-l-lg hidden md:block"
            src={"../assets/imgForm.jpg"}
            alt=""
          />
          <div className="p-10 md:p-20 bg-white w-full md:w-[60%] rounded">
            <div className="mb-9">
              <p className="text-2xl">
                Registrarse o{" "}
                <a href="/login" className="text-blue-800">
                  Iniciar sesión
                </a>
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
