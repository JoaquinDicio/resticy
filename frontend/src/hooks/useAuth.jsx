import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ emailError: null, passwordError: null, nameError: null, credentialsError: null });  
  const navigate = useNavigate();

  const authenticate = async (formData) => {
    // TODO : peticion al backend
    // esta funcion puede terminar en una redireccion o bien en un cambio de estado
    // los errores deben setearse en un state al igual que el loader

    setLoading(true);

    try{

      await axios.post("http://localhost:8080/login", formData);
      console.log('Se redirije al dashboard [Todavia no se creo]')

      navigate("#");
    }catch(error){
      const errorData = error.response.data; 
      setErrors(prev => ({
        credentialsError: errorData || prev.credentialsError,
      }));
    }

    setLoading(false)
  };

  const register = async (formData) => {

    setLoading(true);

    try {
      await axios.post("http://localhost:8080/register", formData);
      navigate("/login");
    } catch (error) {
      const errorData = error.response.data; 
      console.log(errorData)

      if (errorData) {
        setErrors(prev => ({
          emailError: errorData || prev.emailError,
        }));
      }
      
    }
    setLoading(false);
  };

  return { authenticate, register, errors, isLoading };
}
