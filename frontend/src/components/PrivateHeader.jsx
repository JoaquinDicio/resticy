import { NavLink } from "react-router-dom";

export default function PrivateHeader({ logout }) {
  return (
    <header className="text-white flex items-center justify-between bg-[var(--wine-color)] p-3 shadow-sm">
      <h1 className="font-medium text-xl">Resticy</h1>
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
