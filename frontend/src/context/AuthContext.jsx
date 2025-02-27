import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!Cookies.get("authToken"));
  const [user, setUser] = useState(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null; 
  });
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userCookie = Cookies.get("user");

    if (token) {
      setIsAuth(true);
    }

    if (userCookie) {
      setUser(JSON.parse(userCookie)); 
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
