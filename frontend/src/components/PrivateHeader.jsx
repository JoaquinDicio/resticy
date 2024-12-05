import { NavLink } from "react-router-dom";
import image from "../assets/favicon.png";
export default function PrivateHeader({ logout }) {
  return (
    <header className="text-white flex items-center justify-between bg-[var(--wine-color)] p-3 shadow-sm fixed w-full top-0">
      <div className="flex gap-1 items-center">
        <img className="w-[40px] h-[40px]" src={image} alt="Resticy icon" />
        <p className="font-medium text-2xl">Resticy</p>
      </div>
      <div className="flex gap-5 items-center">
        <nav>
          <ul className="flex gap-3">
            <li>
              <NavLink to={"/orders"}>Mis mesas</NavLink>
            </li>
            <li>
              <NavLink to={"/allitems"}>Mis articulos</NavLink>
            </li>
          </ul>
        </nav>
        <button
          onClick={logout}
          className="bg-[var(--yellow-color)] text-white p-2 text-sm rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
