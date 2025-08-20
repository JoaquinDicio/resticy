import { createContext, useEffect, useState } from "react";
import axios from "axios";
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
    if (token) {
      verifyToken(token);
    }
  }, []);

  function logout() {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setIsAuth(false);
    setUser(null);
  }

  async function verifyToken(token) {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (user) {
      setUser(data.user);
      setIsAuth(true);
      console.log(user);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
