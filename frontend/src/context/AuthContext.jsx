import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!Cookies.get("authToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (Cookies.get("authToken")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
