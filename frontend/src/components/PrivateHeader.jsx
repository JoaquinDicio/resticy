import { NavLink } from "react-router-dom";
import { useState } from "react";
import image from "../assets/favicon.png";

export default function PrivateHeader({ logout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-10 text-white flex items-center justify-between bg-[var(--wine-color)] p-3 shadow-sm fixed w-full top-0 z-50">
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          {isMenuOpen ? (
            <p className="text-[--yellow-color] w-[26px]">X</p>
          ) : (
            <i class="fa-solid fa-bars text-3xl md:hidden text-[--yellow-color]"></i>
          )}
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <img className="w-[40px] h-[40px]" src={image} alt="Resticy icon" />
        <p className="font-medium text-2xl hidden md:block">Resticy</p>
      </div>

      <div className="opacity-0 md:hidden">algo</div>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 bg-[var(--wine-color)] w-full md:w-auto md:flex md:static md:gap-5`}
      >
        <ul className="flex flex-col md:flex-row md:gap-3 p-3 md:p-0">
          <li>
            <NavLink
              to={"/orders"}
              className="block p-2 hover:text-[var(--yellow-color)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Mis mesas
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/allitems"}
              className="block p-2 hover:text-[var(--yellow-color)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Mis artículos
            </NavLink>
          </li>
        </ul>
        <div className="md:block px-[20px]">
          <button
            onClick={logout}
            className="bg-[var(--yellow-color)] text-white p-2 text-sm rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}
