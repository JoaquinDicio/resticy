import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

export default function UseTables() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const { user } = useContext(AuthContext);

  const restaurantID = user?.restaurantID;

  const [tables, setTables] = useState([]);

  const [error, setError] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const [isPosting, setPosting] = useState(false);

  const token = Cookies.get("authToken"); //token de autenticacion de usuario

  const axiosConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  useEffect(() => {
    getTables();
  }, []);

  async function getTables() {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/tables/${restaurantID}`);
      if (response.status === 200) setTables(response.data);
    } catch (error) {
      console.log("Error obteniendo las mesas", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function createTable(newTable) {
    try {
      const response = await axios.post(
        `${baseUrl}/tables`,
        { data: newTable },
        axiosConfig
      );

      // if everything went fine we add the table to the array
      if (response.status === 200) {
        setTables((prev) => [...prev, { ...response.data }]);
        return response;
      }
    } catch (error) {
      console.log("Error creando la mesa", error);
      setError(error);
    }
  }

  return { tables, setTables, error, isPosting, createTable };
}
