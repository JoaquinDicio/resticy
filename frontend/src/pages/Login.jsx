import LoginForm from "../components/LoginForm";
import back from "../assets/flecha-atras.png";

export default function Login() {
  return (
    <main>
      <a href="/">
        {" "}
        <img
          className="w-[40px] w-[40px] absolute top-10 left-10"
          src={back}
          alt="back icon"
        />
      </a>
      <div className="w-[100%] min-h-screen bg-[var(--wine-color)] flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-[70vw] rounded-lg min-h-[40rem]" data-aos="fade-left">
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
