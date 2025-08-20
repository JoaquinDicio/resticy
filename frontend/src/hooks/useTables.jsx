import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UseTables() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const { user } = useContext(AuthContext);

  const restaurantID = user?.restaurantID;

  const [tables, setTables] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    getTables();
  }, []);

  async function getTables() {
    try {
      const response = await axios.get(`${baseUrl}/tables/${restaurantID}`);
      if (response.ok) setTables(response.data);
    } catch (error) {
      console.log("Error obteniendo las mesas", error);
      setError(error);
    }
  }

  return { tables, error };
}
