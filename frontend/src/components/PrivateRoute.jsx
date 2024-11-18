import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const { isAuth, logout } = useContext(AuthContext);

  if (isAuth) {
    return (
      <>
        <header className="text-white flex items-center justify-between bg-[var(--wine-color)] p-3 shadow-sm">
          <h1 className="font-medium text-xl">Resticy</h1>
          <div className="flex gap-5 items-center">
            <nav>
              <ul className="flex gap-3">
                <li>Mesas</li>
                <li>Articulos</li>
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
        {children}
      </>
    );
  }

  return <Navigate to="/login" />;
}
