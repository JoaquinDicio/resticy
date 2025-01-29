import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!Cookies.get("authToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("user");

    if (token) {
      setIsAuth(true);
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error al parsear la cookie 'user':", error);
      }
    }
  }, []);

  function logout() {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setIsAuth(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
