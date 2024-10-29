import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authenticate = async (formData) => {
    // TODO : peticion al backend
    // esta funcion puede terminar en una redireccion o bien en un cambio de estado
    // los errores deben setearse en un state al igual que el loader
    setLoading(true);
    console.log(formData);
  };

  const register = async (formData) => {

    setLoading(true);

    try {
      await axios.post("http://localhost:8080/register", formData);
      navigate("/login");
    } catch (error) {
      setError(error.response.data)
      console.log(error.response.data)
    }

    setLoading(false);
    console.log(formData);
  };

  return { authenticate, register, error, isLoading };
}
