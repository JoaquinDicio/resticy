import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <main>
      <div className="w-[100%] h-screen bg-[#51161F] flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-[70vw] h-[70vh] rounded-lg">
          <img className="h-[100%] overflow rounded-l-lg hidden md:block" src={'../assets/imgForm.jpg'} alt="" />
          <div className="p-10 md:p-20 bg-white w-full md:w-[60%] rounded-r-lg">
            <div className="mb-9">
              <p className="text-2xl">
                Registrarse o <a href="#" className="text-blue-800">Iniciar Sesion</a>
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Register;
