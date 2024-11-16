import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function useAuth() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null,
    nameError: null,
    credentialsError: null,
  });
  const navigate = useNavigate();

  const authenticate = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        formData
      );

      // guarda el token en una cookie porque local y sesion son menos seguros
      Cookies.set("authToken", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      navigate("/orders");
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
      await axios.post("http://localhost:8080/register", formData);
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
