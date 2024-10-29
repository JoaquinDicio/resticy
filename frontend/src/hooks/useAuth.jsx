import { useState } from "react";

export default function useAuth() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async (formData) => {
    // TODO : peticion al backend
    // esta funcion puede terminar en una redireccion o bien en un cambio de estado
    // los errores deben setearse en un state al igual que el loader
    setLoading(true);
    console.log(formData);
  };

  const register = async (formData) => {
    // TODO : peticion al backend
    // lo mismo que la funcion anterior
    setLoading(true);
    console.log(formData);
  };

  return { authenticate, register, error, isLoading };
}
