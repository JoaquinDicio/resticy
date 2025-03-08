import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { setIsAuth, setUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const authenticate = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://resticy-production.up.railway.app/login",
        formData
      );

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
      setErrors(response.data.error || "Algo salio mal");
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await axios.post(
        "https://resticy-production.up.railway.app/register",
        formData
      );
      navigate("/login");
    } catch (error) {
      const { response } = error;
      setErrors(response.data.error || "Algo salio mal");
    } finally {
      setLoading(false);
    }
  };

  return { authenticate, register, errors, isLoading };
}
