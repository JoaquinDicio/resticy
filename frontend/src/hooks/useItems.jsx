import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

export default function useItems() {
  const [items, setItems] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const token = Cookies.get("authToken"); //token de autenticacion de usuario

  const baseUrl = import.meta.env.VITE_API_URL;

  const axiosConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      setLoading(true);

      const response = await axios.get(
        `${baseUrl}/items/${user?.restaurantID}`
      );

      if (response.status === 200) {
        setItems(response.data);
      }
    } catch (error) {
      console.log("ERROR obteniendo los items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    try {
      const response = await axios.delete(
        `${baseUrl}/itemDelete/${id}`,
        axiosConfig
      );

      // modifica el array evitando hacer fetch nuevamente
      if (response.status === 200) {
        setItems(items.filter((item) => item.id !== id));
      }

      return response;
    } catch (error) {
      console.log("ERROR eliminado el articulo:", error);
    }
  }

  async function addItem(itemData) {
    try {
      const response = await axios.post(`${baseUrl}/items`, itemData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setItems([...items, response.data]);
      }
    } catch (error) {
      console.log("ERROR agregando el articulo", error);
    }
  }

  return { deleteItem, items, setItems, getItems, isLoading, addItem };
}
