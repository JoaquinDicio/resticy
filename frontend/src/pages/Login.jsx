import React from "react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <main>
      <div className="w-[100%] min-h-screen bg-[var(--wine-color)] flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-[70vw] rounded-lg min-h-[40rem]">
          <img
            className="max-w-[400px] w-full overflow rounded-l-lg hidden md:block"
            src={"../assets/imgForm.jpg"}
            alt=""
          />
          <div className="p-10 md:p-20 bg-white w-full md:w-[60%] rounded">
            <div className="mb-9 text-2xl flex">
              <p>
                Iniciar sesión o{" "}
                <a href="/register" className="text-blue-800">
                  Registrarse
                </a>
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
