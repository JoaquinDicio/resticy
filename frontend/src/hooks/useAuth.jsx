import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
const baseUrl = import.meta.env.VITE_API_URL;

export default function useAuth() {
  const { setIsAuth, setUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const authenticate = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/login`, formData);

      if (data.token) {
        // guarda el token en una cookie porque local y sesion son menos seguros
        Cookies.set("authToken", data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        Cookies.set("user", JSON.stringify(data.user), {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        setUser(data.user);
        setIsAuth(true);
        navigate("/orders");
      }
    } catch (error) {
      const { response } = error;
      setError(response.data || "Algo salio mal");
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/register`, formData);
      navigate("/login");
    } catch (error) {
      const { response } = error;
      setError(response.data || "Algo salio mal");
    } finally {
      setLoading(false);
    }
  };

  return { authenticate, register, error, isLoading };
}
