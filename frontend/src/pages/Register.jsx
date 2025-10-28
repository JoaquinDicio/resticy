import RegisterForm from "../components/RegisterForm";
import back from "../assets/flecha-atras.png";
import imgForm from "../assets/imgForm.jpg";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main data-aos="fade-in">
      <Link to={{ pathname: "/" }}>
        <img
          className="w-[40px] absolute top-10 left-10"
          src={back}
          alt="back icon"
        />
      </Link>
      <div className="w-full min-h-screen bg-[var(--wine-color)] flex justify-center items-center">
        <div className="flex-col w-[85%] h-[70vh] md:min-h-[550px] md:flex-row lg:w-[75%] rounded-lg flex justify-center">
          <div className="w-[40%] ">
            <img
              className="h-full w-full object-cover overflow-hidden rounded-l-lg hidden md:block"
              src={imgForm}
              alt=""
            />
          </div>
          <div className="p-10 md:p-15 bg-white w-full md:w-[60%] rounded">
            <div className="mb-9">
              <p className="text-xl lg:text-2xl">
                Registrarse o{" "}
                <Link to={{ pathname: "/login" }} className="text-blue-800">
                  Iniciar sesión
                </Link>
              </p>
            </div>
            <div className="h-[100%]">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
