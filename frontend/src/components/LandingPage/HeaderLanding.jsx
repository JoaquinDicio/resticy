import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/favicon.png";

const HeaderLanding = () => {

const [showMenu, setShowMenu] = useState(false);

  return (
    <>
    <header className="bg-[--wine-color] z-20 text-white flex justify-between items-center py-2 px-10 md:px-20 fixed flex w-full flex-wrap">
            <i
              onClick={() => setShowMenu(!showMenu)}
              className="fa-solid fa-bars text-3xl md:hidden text-[--yellow-color]"
            ></i>
            <img
              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] "
              src={logo}
              alt="Logo Resticy"
            />
            <button className="bg-transparent md:hidden text-[--wine-color] font-bold rounded-sm px-2 py-1"></button>
            <nav
              className={`md:px-10 py-5 md:py-0 md:pt-0 w-full md:flex-1 md:block ${
                !showMenu && "hidden"
              }`}
            >
              <ul className="flex gap-3 flex-col md:flex-row">
                <li>
                  <a href="#home">Funcionalidades</a>
                </li>
                <li>
                  <a href="#plans">Planes</a>
                </li>
                <li>
                  <a href="#characteristics">Caracteristicas</a>
                </li>
              </ul>
            </nav>
            <div className="hidden text-sm lg:text-md md:flex gap-3 ">
              <Link
                to="/login"
                className="border border-1 border-[--yellow-color] text-white rounded px-4 py-2"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-[--yellow-color] text-white rounded px-4 py-2"
              >
                Registrarse
              </Link>
            </div>
          </header>
    
    </>
  )
}

export default HeaderLanding
