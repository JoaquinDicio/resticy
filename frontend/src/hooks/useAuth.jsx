import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      await axios.post("http://localhost:8080/login", formData);
      //TODO => redirigir al dashboard cuando exista
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
